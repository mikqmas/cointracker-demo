<video controls src="cointrackerdemo.mp4" title="Demo"></video>

git clone htt

SETUP (Windows)
BE:
cd .\CoinTracker-Demo\server
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python main.py

FE:
cd .\CoinTracker-Demo\client
npm install
npm run dev



BE:
| Technology     | Notes                         |
|----------------|-------------------------------|
| Flask          | A quick demo app, benefit of lightweight API framework. |
| SQLite         | Also because demo, using to show MVP. Also helps it's part of Python's standard library. |
| SQLAlchemy     | An ORM library for Python, helps with building class model for easier DB work.    |
| Bcrypt     | Battle tested encryption for passwords, prevent plain text security issue.    |
| JWT     | Simplifies working with JSON Web Token for login session, verifying user.    |
| Redis Queue     | Async task queue    |
| PyTest     | Python testing framework    |


FE:
| Technology     | Notes                         |
|----------------|-------------------------------|
| React          | A JavaScript library for building user interfaces. |
| React Router DOM     | Helps with routing pages. |
| Vite          | Easy build, generally more opinionated but quicker than webpack. |
| Tailwind          | Tame css, colocation issue with standarized class names |
| Flowbite          | Reusable UI components built on Tailwind. |
| Axios          | Help with client HTTP requests to BlockChair. |
| Vitest          | Testing framework |
| React-Testing-Library          | DOM and React component test helper |


Misc:

| Technology     | Notes                         |
|----------------|-------------------------------|
| Insomnia          | This or POSTMAN, helps with API work |


Futher things to discuss, future implementations:
Security: Store passwords securely by hashing them and never store plain text passwords.
Scalability: Ensure your schema can scale as the number of users and wallets grows. You might consider partitioning or sharding if needed.
Backup and Recovery: Implement a robust backup and recovery strategy to prevent data loss.

Questions to answer:
- DB - why SQLite
- API - REST vs GraphQL
- automation - CI/CD using Jenkins - build on deploy, test suite
- monitoring - DataDog
- testing - Vitest and React Testing Library for client. pytest for Flask