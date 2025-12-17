import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import PlantCard from "../components/PlantCard";

function Products() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("plants")
        .select("*")
        .order("category", { ascending: true });

      if (fetchError) throw fetchError;

      setPlants(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching plants:", err);
    } finally {
      setLoading(false);
    }
  };

  const groupPlantsByCategory = (plantsArray) => {
    return plantsArray.reduce((acc, plant) => {
      if (!acc[plant.category]) acc[plant.category] = [];
      acc[plant.category].push(plant);
      return acc;
    }, {});
  };

  const categories = groupPlantsByCategory(plants);

  if (loading) {
    return (
      <div className="products-loading">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading our beautiful plants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Oops! Something went wrong</h4>
          <p>{error}</p>
          <button className="btn btn-success mt-2" onClick={fetchPlants}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="products-empty">
        <h3>No plants available at the moment</h3>
        <p>Please check back later!</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <h2 className="products-title">Our Collection</h2>

        {Object.entries(categories).map(([category, categoryPlants]) => (
          <div key={category} className="category-section">
            <h3 className="category-title">{category}</h3>
            <div className="row g-4">
              {categoryPlants.map((plant) => (
                <div key={plant.id} className="col-12 col-md-6 col-lg-4">
                  <PlantCard plant={plant} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
