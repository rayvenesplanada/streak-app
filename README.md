# Streak App

## Overview
This is a simple streak app that displays 7 days of streak data. The data is fetched from the backend which gets the data from a JSON file.

## Pre-requisites
- Node.js
- npm

## Installation
1. Clone the repository
```bash
git clone https://github.com/rayvenesplanada/streak-app.git
```
2. Install the dependencies in both the frontend and backend folders
```bash
cd frontend
npm install
cd ../backend
npm install
```

## Local Testing
1. Run the backend
```bash
cd backend
npm run start
```
2. Run the frontend
```bash
cd frontend
npm run start
```
3. Export the REACT_APP_STREAK_NUMBER environment variable based on the case you want to test. e.g. `EXPORT REACT_APP_STREAK_NUMBER=1`
4. Open your browser and navigate to `http://localhost:3000`
5. You should see the streak app displayed with the streak data for the streak number you exported.
6. Switch through cases by changing the path to the streak number you want to test. e.g. `http://localhost:3000/1`


### Test Cases:
**Case 1:**  **6-day streak.** Previous day is AT_RISK (0 activities) and current day has 2 activities so streak is saved.
**Case 2:**  **4-day streak.** Previous day is AT_RISK (0 activities) and current day has only 1 activity so streak is still frozen (current day is AT_RISK).
**Case 3:** **0-day streak.** Previous 2 days are AT_RISK and current day has only 2 activities (need 3 to save) so streak is broken and current day is INCOMPLETE.

### Constraints
1. The streak number is passed as an environment variable to the frontend.
2. The backend fetches the streak data from a static JSON file.
   1. The JSON file is an Array of "Streak" objects containing 7 days of data starting from the current day and going backwards.
3. This App assumes that it can only store 7 days worth of streak data at a time.
4. When the streak is broken, the streak number is reset to 0.
5. API always returns a sorted list of streaks from recent to oldest. So this means the first entry is always the current day.

### Improvements
1. Use a database like Firestore to store the streak data.
2. Add user sessions, authentication, and authorization to distinguish streaks between users.
3. Add OAuth tokens to authenticate API requests.
4. Implement better logging strategies.

### Libraries used
**For frontend:**
- moment - date formatting and comparison
- react-spinners - loading spinner
- react-tooltip - tooltip display
- react-icons - icons for streak states
- axios - REST API calls
- motion - animations (just for display)

### Data
#### `data.json` contents
```
[
    [
        {
            "date": "2025-02-24",
            "activities": ["activity1", "activity2"],
            "state": "UNSET"
        },
        {
            "date": "2025-02-23",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-22",
            "activities": ["activity3"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-21",
            "activities": ["activity4"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-20",
            "activities": ["activity5"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-19",
            "activities": ["activity6"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-18",
            "activities": [],
            "state": "INCOMPLETE"
        }
    ],
    [
        {
            "date": "2025-02-24",
            "activities": ["activity1"],
            "state": "UNSET"
        },
        {
            "date": "2025-02-23",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-22",
            "activities": ["activity2"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-21",
            "activities": ["activity3"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-20",
            "activities": ["activity4"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-19",
            "activities": ["activity5"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-18",
            "activities": [],
            "state": "INCOMPLETE"
        }
    ],
    [
        {
            "date": "2025-02-24",
            "activities": [],
            "state": "UNSET"
        },
        {
            "date": "2025-02-23",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-22",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-21",
            "activities": ["activity1"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-20",
            "activities": ["activity2"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-19",
            "activities": ["activity3"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-18",
            "activities": [],
            "state": "INCOMPLETE"
        }
    ],
    [
        {
            "date": "2025-02-24",
            "activities": ["activity1", "activity2", "activity3"],
            "state": "UNSET"
        },
        {
            "date": "2025-02-23",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-22",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-21",
            "activities": ["activity1"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-20",
            "activities": [],
            "state": "INCOMPLETE"
        },
        {
            "date": "2025-02-19",
            "activities": [],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-18",
            "activities": [],
            "state": "INCOMPLETE"
        }
    ],
    [
        {
            "date": "2025-02-24",
            "activities": ["activity1", "activity2", "activity3"],
            "state": "UNSET"
        },
        {
            "date": "2025-02-23",
            "activities": ["activity4"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-22",
            "activities": ["activity1"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-21",
            "activities": ["activity1"],
            "state": "COMPLETED"
        },
        {
            "date": "2025-02-20",
            "activities": [],
            "state": "INCOMPLETE"
        },
        {
            "date": "2025-02-19",
            "activities": [],
            "state": "AT_RISK"
        },
        {
            "date": "2025-02-18",
            "activities": [],
            "state": "AT_RISK"
        }
    ]
] 
```
