*   **Get FIT Dude Development Outlne**
    - Workout web app named, "Get Fit Dude"
    - Attractive, Cool, Stylish, Modern, Functional

*   **GOAL**
    - Web app for MOBILE that displays a WEEKLY work out plans and daily work outs
    - Weekly workout plan has a default exercises but is completely customizable by the user. 
    - All edits are persistent using localStorage
    - Exercise Information Panel has an "New Exercise" option at the bottom to add a new exercise
    - Customizeable multi stage countdown timer
    - Popup to display detailed exercise infromation
    - Graphs for each exercise to show user changes in Set and Reps/Time over time

*   **VISUAL STYLE**
    - Dark Mode
    - Purple/Orange color scheme and glow effects
    - Modern Font and UI styling using the coolest Tailwind CSS Options
    - Subtle colorful animations for EVERY action
    - Adjusts well to all common mobile screen dimensions

*   **REQUIREMENTS**
    - ReactJS 
        - React Context API
        - Functional Componenets
    - NodeJS 
    - Tailwind CSS 
        - Use Built-in Break Points
    - D3.js 
        - Encapsulate D3 code within useEffect hooks in functional components
        - Use React refs to access DOM elements that D3 will manipulate. This allows D3 to work directly with the DOM without conflicting with React's virtual DOM.
        - Visualization is screen size relative
    - Hammer.js
        - Custom React Hooks
        - Used for element option changes
    
    - NPM to serve page locally for development
    - Reasonable Data Structure for localStorage. Taking in to consideration the need to record 3 very different models
    - Modular file structure 

*   **UX**
    - Responsive and smooth design 
    - Using CSS transitions/animations
    - Buttons have and under glow pulse when clicked
    - Popups have an ease in and out
    - Timer has a 10 Count flash towards the end
    - Inital Workout plan will be included
    

*   **LAYOUT**
    * Component Hierarchy,  App → WorkoutCalendar, DailyWorkout, TimerPanel, ExerciseInfo
    * Panels flex down. Panel width is set relative to screen dimensions for a consistent design
    * Header, "Get Fit Dude!"
    * 7 Day Workout Calendar Panel
        - Table with 8 Coloums and 2 rows
        - Workout displayed defaults the current day
        - Days are selectable to view the workout for other days.      
        - Row 1
            - Columns: Week #, Mon, Tue, Wed, Thu, Fri, Sat, Sun
        - Row 2
            - Column 1: Week # based on Start Date of Workout Plan. This date is customizable
                - When tapped a 3 part DD/MM/YYYY date input appears to set the date.
                    -This data is persistent and saved in the Workout Plan Data Structure
            - Column 2- 7: Workout Type for each day. eg, Upper Body, Lower Body, Core   
    * Workout Panel
        - Displays a table of all exercises for the day
            - Table with 3 Coloums and a Row for each Exercise in the day's workout 
            - Footer button labeled, "+Add Exercise". This button append a new exercise to the Workout Plan for that day.
            - Exercise Row
                - Column 1: Exercise Name and edit button (Pencil Icon)
                        - Tapping the Exercise Name will populate the Exercise Information Panel with that exercise's, EXERCISE DATA
                        - Tapping the edit button will generate a popup with a scrollable list of all availiable exercises. The exercise chosen will replace the previous exercise for that day of the week.
                - Column 2: Sets #
                - Column 3: Reps #
                - Each number for Set and Reps is customizable with a, tap and swipe up or down
                    - These changes are recorded to localStorage with a Time Stamp to be persistent
                        - Only one change per day is registered. The last change for the day overwrites any previous entry for the day. This is to maintain only one data point per day.
                
    * Multi-Stage Countdown Timer Panel
        - Use setTimeout/setInterval 
        - Circular Styled Countdown Timer
        - Centralized Countdown Timer Display
            - Numbers are editable with tap and swipe up or down when not in a countdown state
        - Countdown Timer function buttons row
            - Start, Stop, Reset
        - Multi Stage function buttons row
            - Start, Stop, Reset, Prev, Next 
        - Multi Stage Control Panel
            - Table with 2 columns and a row for each stage
                - Column 1: Stage Name
                - Column 2: Stage Time
    * Exercise Information Panel
        - Editable list with 5 rows
            - Name
            - Sets
            - Rep Type, Reps
            - Example Video Panel
            - Variantion List
        - Graph of historical changes
            - Graph should adjust size to show data from the first recorded date
                - Line graph with dots for each point of change
            - X Axis: Date
                - NO Labels EXCEPT for first date and last date
            - Y Axis: (Sets x Reps)
                - NO Labels 
            - Data Points
                - Small text, 2 Lines, Sets #, Reps #
            - Add Exercise
                - Creates a new placeholder exercise the user can customize in the Exercise Information Panel. The new exercise
    * Footer
        - "Conduction 2025"


*   **Data Structure**

    *   **EXERCISE DATA**
        - Name
        - Sets: #
        - Reps Type: Count, Time
        - Reps: #
        - Catergory: Upper Body, Lower Body, Core
        - Example Video URL
        - Variations List
        - EXERCISE HISTORY

    *   **WORKOUT PLAN**
        - State Date: DD/MM/YYYY
        - Monday: Exercise
        - Tuesday: Exercise
        - Wednesday: Exercise
        - Thursday: Exercise
        - Friday: Exercise
        - Saturday: Exercise
        - Sunday: Exercise
    
    *   **EXERCISE HISTORY**
        - Date of change
        - Sets
        - Reps




        

        

