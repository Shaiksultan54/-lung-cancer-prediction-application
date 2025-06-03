"""
Script to train and save ML models for lung cancer prediction.
This is a sample script - you'll need to replace with your actual training data.
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def generate_sample_data(n_samples=1000):
    """Generate sample lung cancer dataset for demonstration"""
    np.random.seed(42)
    
    data = {
        'GENDER': np.random.choice([0, 1], n_samples),  # 0: Female, 1: Male
        'AGE': np.random.randint(20, 80, n_samples),
        'SMOKING': np.random.choice([0, 1, 2], n_samples),  # 0: No, 1: Yes, 2: Former
        'YELLOW_FINGERS': np.random.choice([0, 1, 2], n_samples),
        'ANXIETY': np.random.choice([0, 1, 2], n_samples),
        'PEER_PRESSURE': np.random.choice([0, 1, 2], n_samples),
        'CHRONIC_DISEASE': np.random.choice([0, 1, 2], n_samples),
        'FATIGUE': np.random.choice([0, 1, 2], n_samples),
        'ALLERGY': np.random.choice([0, 1, 2], n_samples),
        'WHEEZING': np.random.choice([0, 1, 2], n_samples),
        'ALCOHOL_CONSUMING': np.random.choice([0, 1, 2], n_samples),
        'COUGHING': np.random.choice([0, 1, 2], n_samples),
        'SHORTNESS_OF_BREATH': np.random.choice([0, 1, 2], n_samples),
        'SWALLOWING_DIFFICULTY': np.random.choice([0, 1, 2], n_samples),
    }
    
    # Create target based on risk factors (this is simplified logic)
    risk_factors = (
        data['SMOKING'] * 0.3 +
        data['YELLOW_FINGERS'] * 0.2 +
        data['CHRONIC_DISEASE'] * 0.2 +
        data['WHEEZING'] * 0.15 +
        data['COUGHING'] * 0.15 +
        np.random.normal(0, 0.1, n_samples)  # Add some noise
    )
    
    # Convert to binary classification
    data['LUNG_CANCER'] = (risk_factors > np.percentile(risk_factors, 70)).astype(int)
    
    return pd.DataFrame(data)

def train_and_save_models():
    """Train ML models and save them"""
    
    # Create models directory
    os.makedirs('app/ml_models', exist_ok=True)
    
    # Generate or load your dataset
    print("📊 Generating sample dataset...")
    df = generate_sample_data(2000)
    
    # Prepare features and target
    feature_columns = [col for col in df.columns if col != 'LUNG_CANCER']
    X = df[feature_columns]
    y = df['LUNG_CANCER']
    
    print(f"Dataset shape: {X.shape}")
    print(f"Target distribution: {y.value_counts().to_dict()}")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale features for SVM
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Define models
    models = {
        'random_forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'svm': SVC(probability=True, random_state=42),
        'knn': KNeighborsClassifier(n_neighbors=5),
        'decision_tree': DecisionTreeClassifier(random_state=42, max_depth=10)
    }
    
    # Train and save models
    model_performance = {}
    
    for name, model in models.items():
        print(f"\n🔄 Training {name}...")
        
        try:
            if name == 'svm':
                # Use scaled features for SVM
                model.fit(X_train_scaled, y_train)
                y_pred = model.predict(X_test_scaled)
                
                # Save scaler for SVM
                scaler_path = f'app/ml_models/{name}_scaler.pkl'
                joblib.dump(scaler, scaler_path)
                print(f"📁 Saved scaler: {scaler_path}")
            else:
                model.fit(X_train, y_train)
                y_pred = model.predict(X_test)
            
            # Evaluate model
            accuracy = accuracy_score(y_test, y_pred)
            model_performance[name] = accuracy
            
            print(f"✅ {name} Accuracy: {accuracy:.4f}")
            
            # Save model
            model_path = f'app/ml_models/{name}_model.pkl'
            joblib.dump(model, model_path)
            print(f"💾 Saved model: {model_path}")
            
            # Print classification report
            print(f"\nClassification Report for {name}:")
            print(classification_report(y_test, y_pred))
            
        except Exception as e:
            print(f"❌ Error training {name}: {str(e)}")
    
    # Print summary
    print("\n" + "="*50)
    print("🎯 MODEL TRAINING SUMMARY")
    print("="*50)
    for name, accuracy in model_performance.items():
        print(f"{name.upper():<20}: {accuracy:.4f}")
    
    # Find best model
    if model_performance:
        best_model = max(model_performance.items(), key=lambda x: x[1])
        print(f"\n🏆 Best Model: {best_model[0]} (Accuracy: {best_model[1]:.4f})")
    
    print("\n✅ Training completed! Models saved in 'app/ml_models/' directory")

def test_model_loading():
    """Test if saved models can be loaded correctly"""
    print("\n🧪 Testing model loading...")
    
    models_dir = 'app/ml_models'
    model_files = [
        'random_forest_model.pkl',
        'svm_model.pkl', 
        'knn_model.pkl',
        'decision_tree_model.pkl'
    ]
    
    for model_file in model_files:
        model_path = os.path.join(models_dir, model_file)
        if os.path.exists(model_path):
            try:
                model = joblib.load(model_path)
                print(f"✅ Successfully loaded: {model_file}")
                
                # Test prediction with sample data
                sample_features = np.array([[1, 45, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0]])
                
                if 'svm' in model_file:
                    # Load scaler for SVM
                    scaler_path = model_path.replace('_model.pkl', '_scaler.pkl')
                    if os.path.exists(scaler_path):
                        scaler = joblib.load(scaler_path)
                        sample_features = scaler.transform(sample_features)
                
                prediction = model.predict(sample_features)[0]
                if hasattr(model, 'predict_proba'):
                    probabilities = model.predict_proba(sample_features)[0]
                    print(f"   Sample prediction: {prediction}, Probabilities: {probabilities}")
                else:
                    print(f"   Sample prediction: {prediction}")
                    
            except Exception as e:
                print(f"❌ Failed to load {model_file}: {str(e)}")
        else:
            print(f"⚠️  File not found: {model_file}")

if __name__ == "__main__":
    print("🚀 Starting ML Model Training...")
    print("="*50)
    
    try:
        train_and_save_models()
        test_model_loading()
        
        print("\n🎉 All done! You can now run your Flask app.")
        print("Run: python run.py")
        
    except Exception as e:
        print(f"❌ Training failed: {str(e)}")
        import traceback
        traceback.print_exc()