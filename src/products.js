const products = [
    { id: 1, name: 'Dumbbells', description: 'A pair of durable, high-quality dumbbells.', price: '25.00', image: 'data:image/jpeg;base64,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' },
    { id: 2, name: 'Yoga Mat', description: 'Eco-friendly, non-slip yoga mat.', price: '15.00', image: 'data:image/jpeg;base64,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' },
    { id: 3, name: 'Resistance Bands', description: 'Set of 5 resistance bands with different levels.', price: '20.00', image: 'data:image/jpeg;base64,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' },
    { id: 4, name: 'Kettlebell', description: 'High-quality kettlebell for strength training.', price: '35.00', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Treadmill', description: 'Compact treadmill for easy storage.', price: '250.00', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Exercise Bike', description: 'Stationary exercise bike with multiple resistance levels.', price: '180.00', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Foam Roller', description: 'High-density foam roller for recovery and stretching.', price: '20.00', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Pull-up Bar', description: 'Doorway pull-up bar with multiple grip positions.', price: '25.00', image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Weighted Vest', description: 'Adjustable weighted vest for resistance training.', price: '60.00', image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Boxing Gloves', description: 'Professional-grade boxing gloves for training and sparring.', price: '40.00', image: 'https://via.placeholder.com/150' },
  ];
  
  export default products;
  