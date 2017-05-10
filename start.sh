
LOG_DIR=/var/log/nodes
MAX_RETRY=5

PORT=8000 forever start -a -l $LOG_DIR/8000/fv.log -o $LOG_DIR/8000/out.log -e $LOG_DIR/8000/err.log -m MAX_RETRY app.js 
#PORT=8001 forever start -a -l $LOG_DIR/8001/fv.log -o $LOG_DIR/8001/out.log -e $LOG_DIR/8001/err.log -m MAX_RETRY app.js 
#PORT=8002 forever start -a -l $LOG_DIR/8002/fv.log -o $LOG_DIR/8002/out.log -e $LOG_DIR/8002/err.log -m MAX_RETRY app.js 
#PORT=8003 forever start -a -l $LOG_DIR/8003/fv.log -o $LOG_DIR/8003/out.log -e $LOG_DIR/8003/err.log -m MAX_RETRY app.js 
