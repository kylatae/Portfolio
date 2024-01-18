import React, { useState, useEffect, useRef } from 'react';

function GeneticSimilarityMatrix() {
  const [animals, setAnimals] = useState(
    () => JSON.parse(localStorage.getItem('animals')) || defaultAnimals
  );
  const [editingAnimalId, setEditingAnimalId] = useState(null);
  const newAnimalNameRef = useRef(null);
  const newAnimalTypeRef = useRef(null);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const handleResetToDefault = () => {
    setShowResetConfirmation(true);
  };

  const handleConfirmReset = () => {
    setAnimals(defaultAnimals);
    localStorage.setItem('animals', JSON.stringify(defaultAnimals));
    setShowResetConfirmation(false);
  };
 
  const handleCancelReset = () => {
    setShowResetConfirmation(false);
  };

  const handleCheckboxChange = (animalId) => {
    setSelectedAnimals((prevSelected) =>
      prevSelected.includes(animalId)
        ? prevSelected.filter((id) => id !== animalId)
        : [...prevSelected, animalId]
    );
  };

  const handleDeleteSelected = () => {
    setAnimals(animals.filter((animal) => !selectedAnimals.includes(animal.id)));
    setSelectedAnimals([]);
  };

  useEffect(() => {
    localStorage.setItem('animals', JSON.stringify(animals));
  }, [animals]);

  const handleCellEdit = (animalId, field, newValue) => {
    setAnimals(
      animals.map((animal) =>
        animal.id === animalId ? { ...animal, [field]: newValue } : animal
      )
    );
  };

  const handleAddAnimal = () => {
    const newAnimal = {
      id: Math.max(...animals.map((a) => a.id), 0) + 1,
      name: newAnimalNameRef.current.value,
      type: newAnimalTypeRef.current.value,
    };
    setAnimals([...animals, newAnimal]);
    newAnimalNameRef.current.value = '';
    newAnimalTypeRef.current.value = '';
  };

  const handleRemoveAnimal = (id) => {
    setAnimals(animals.filter((animal) => animal.id !== id));
  };

  const handleUpdateAnimal = (updatedAnimal) => {
    setAnimals(
      animals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    );
  };

  const calculateSimilarity = (animal1, animal2) => {
    // ... Logic to calculate genetic similarity percentage
    // (placeholder for now, you'll need to implement the actual calculation)
    return 0; // Temporary random value
  };

  const sortedAnimals = animals.slice().sort((a, b) => {
    const similarity = calculateSimilarity(a, b);
    return similarity > 50 ? -1 : similarity < 50 ? 1 : 0;
  });

  return (
    <div>
    <h2>Genetic Similarity Matrix</h2>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" onChange={(e) => setSelectedAnimals(e.target.checked ? animals.map(a => a.id) : [])} /></th>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Similarity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedAnimals.map((animal) => (
          <tr key={animal.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedAnimals.includes(animal.id)}
                onChange={() => handleCheckboxChange(animal.id)}
              />
            </td>
              <td>{animal.id}</td>
              <td>
                {editingAnimalId === animal.id ? (
                  <input
                    type="text"
                    defaultValue={animal.name}
                    onBlur={(e) => handleCellEdit(animal.id, 'name', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditingAnimalId(animal.id)}>{animal.name}</span>
                )}
              </td>
              <td>
              {editingAnimalId === animal.id ? (
                  <input
                    type="text"
                    defaultValue={animal.type}
                    onBlur={(e) => handleCellEdit(animal.id, 'type', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditingAnimalId(animal.id)}>{animal.type}</span>
                )}                
              </td>
              <td>
                {sortedAnimals
                  .filter((other) => other.id !== animal.id)
                  .map((other) => (
                    <span key={other.id}>
                      {other.name}:
                      {editingAnimalId === animal.id || editingAnimalId === other.id ? (
                        <input
                          type="number"
                          min={0}
                          max={100}
                          defaultValue={calculateSimilarity(animal, other)}
                          onBlur={(e) =>
                            handleCellEdit(animal.id, 'similarity', other.id, e.target.value)
                          }
                        />
                      ) : (
                        <span>{calculateSimilarity(animal, other).toFixed(2)}%</span>
                      )}
                      <br />
                    </span>
                  ))}
              </td>
              <td>{/* Buttons */}</td>
            </tr>
          ))}
          {/* Add new animal row */}
          <tr>
            <td>#</td>
            <td><input ref={newAnimalNameRef} type="text" placeholder="Name" /></td>
            <td><input ref={newAnimalTypeRef} type="text" placeholder="Type" /></td>
            <td>{/* Default similarity 0 */}</td>
            <td><button onClick={handleAddAnimal}>Add</button></td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleDeleteSelected} disabled={selectedAnimals.length === 0}>
        Delete Selected
      </button>
      
     <button onClick={handleResetToDefault}>Reset to Default</button>

      {showResetConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to reset data to default?</p>
          <button onClick={handleConfirmReset}>Yes</button>
          <button onClick={handleCancelReset}>Cancel</button>
        </div>
      )}
    </div>
  );
}

const defaultAnimals = [
  { id: 1, name: 'Human', type: 'Mammal' },
  { id: 2, name: 'Chimpanzee', type: 'Mammal' },
  { id: 3, name: 'Dog', type: 'Mammal' },
  { id: 4, name: 'Eagle', type: 'Bird' },
  { id: 5, name: 'Snake', type: 'Reptile' },
];

export default GeneticSimilarityMatrix;