package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"tienda/controllers"
	"tienda/routes"
)

func initMongoDB() *mongo.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://francobg7:u9bNf3oEDWlmN9FS@cluster0.vt3ug.mongodb.net/Pengutienda"))
	if err != nil {
		log.Fatalf("Error conectando a MongoDB: %v", err)
	}

	fmt.Println("Conexión exitosa a MongoDB")
	return client
}

func main() {
	client := initMongoDB()
	defer client.Disconnect(context.Background())

	// Inicializa los controladores
	controllers.InitProductController(client)
	controllers.InitOrderController(client)

	// Registra las rutas
	routes.RegisterRoutes()

	fmt.Println("Servidor corriendo en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
