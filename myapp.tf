provider "google" {
  project = "my-project-id"
  region  = "us-central1"
}

resource "google_container_cluster" "primary" {
  name     = "my-cluster"
  location = "us-central1"

  initial_node_count = 3

  node_config {
    machine_type = "e2-medium"
  }
}

resource "google_container_node_pool" "primary_nodes" {
  cluster    = google_container_cluster.primary.name
  location   = google_container_cluster.primary.location
  node_count = 3

  node_config {
    preemptible  = true
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend-deployment"
    labels = {
      app = "backend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name  = "backend"
          image = "gcr.io/my-project-id/backend-image"
          port {
            container_port = 7000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name = "backend-service"
  }

  spec {
    selector = {
      app = "backend"
    }

    port {
      port        = 7000
      target_port = 7000
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend-deployment"
    labels = {
      app = "frontend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = "gcr.io/my-project-id/frontend-image"
          port {
            container_port = 5173
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name = "frontend-service"
  }

  spec {
    selector = {
      app = "frontend"
    }

    port {
      port        = 5173
      target_port = 5173
    }

    type = "LoadBalancer"
  }
}