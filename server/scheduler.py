import schedule
import time
from redis import Redis
from rq import Queue
from worker import call_api

redis_conn = Redis()
queue = Queue(connection=redis_conn)

def schedule_task():
    queue.enqueue(call_api)
    print("Task enqueued to call API.")

interval = 30
schedule.every(interval).minutes.do(schedule_task)

while True:
    schedule.run_pending()
    time.sleep(1)

# run: rq worker
# python scheduler.py
