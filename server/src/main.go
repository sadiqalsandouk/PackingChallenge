package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

type Config struct {
	PackSizes []int `json:"pack_sizes"`
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/calculatePacks/{items}", calculatePacksHandler).Methods("GET")

	http.Handle("/", r)
	fmt.Println("Server listening on :8080")

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, nil))
}

func calculatePacksHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	itemsStr := vars["items"]

	items, err := strconv.Atoi(itemsStr)
	if err != nil || items <= 0 {
		http.Error(w, "Invalid input. Must be greater than 0.", http.StatusBadRequest)
		return
	}

	config := loadConfig("config.json")

	packCounts := make(map[int]int)
	remainingItems := items

	for _, packSize := range config.PackSizes {

		if remainingItems >= packSize {
			roundedPacks := math.Round(float64(remainingItems / packSize))
			packCounts[packSize] = int(roundedPacks)
			remainingItems %= packSize
		}
		if remainingItems < 250 && !(remainingItems == 0) {
			packCounts[250] += 1
			break
		}
	}

	var result []string
	for packSize, count := range packCounts {
		if packSize == 250 && (count == 2) {
			result = append(result, fmt.Sprintf("1x500"))
		} else if count > 0 {
			result = append(result, fmt.Sprintf("%dx%d", count, packSize))
		}
	}

	response := strings.Join(result, ", ")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}

func loadConfig(filename string) Config {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var config Config
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&config)
	if err != nil {
		log.Fatal(err)
	}
	return config
}
