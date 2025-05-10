/* eslint-disable */
/**
 * To register Websocket URI with DDR
 */
const DEFAUL_WEB_DDR_URI = "wss://127.0.0.1:20002";

/** add here specific to DDR */
/* eslint-disable */
// noinspection JSUnusedGlobalSymbols,JSCommentMatchesSignature,JSUnresolvedVariable,JSUnresolvedFunction

class WebDDR {
    constructor(webDDRUri) {
        if (webDDRUri) {
            this.wsUri = webDDRUri;
        } else {
            this.wsUri = DEFAUL_WEB_DDR_URI;
        }
        this.webSocket = undefined;
        this.subscribeVariableCallBackArray = [];
        this.onwebSocketConnectedCallback = undefined;
        this.onwebSocketErrorCallback = undefined;
        this.getVariableValueCallbackArray = [];
        this.gGetVariableValueCallbackArray = undefined;
        this.onVariableValueChangedNotificationCallbackArray = [];
        this.onVariableValueChangedNotificationCallback = undefined;
    }

    /**
     * Initialize the this.webSocket connection and attach the event handlers.
     * @param[in] pURI The Web Socket Server URI
     * @param[in] pthis.webSocketConnectedCallback The function called when the connection is established
     */
    initwebSocket(pWebSocketConnectedCallback) {
        try {
            if (pWebSocketConnectedCallback) {
                this.webSocketConnectedCallback = pWebSocketConnectedCallback;
            }

            // Close existing websocket if any
            if (this.webSocket && this.webSocket.readyState === this.webSocket.OPEN) {
                this.webSocket.onclose = undefined;
                this.webSocket.close();
            }

            this.webSocket = new WebSocket(this.wsUri);
            this.webSocket.onopen = this.webSocketConnectedCallback;
            this.webSocket.onclose = this.webSocketClosed;
            this.webSocket.onmessage = this.onwebSocketMessageReceived;
            this.webSocket.onerror = this.webSocketError;
            this.webSocket.context = this;

        }
        catch (exception) {
            console.log('Exception thrown during the initialization of the this.webSocket: ' + exception);
        }
    }

    /**
     * Function called when the this.webSocket is disconnected.
     */
    webSocketClosed(e) {
        console.log("this.webSocket Client disconnected from the address: " + this.context.wsUri);
        console.log("Websocket: " + e.code);
        console.log("Websocket: " + e.reason);
        console.log("Websocket: " + e.wasClean);
        // The server is offline try to reconnect in 2 seconds.
        this.webSocket = undefined;
        setTimeout(() => { this.context?.initwebSocket(this.context?.webSocketConnectedCallback); }, 1000);
    }

    /**
     * Function called when an error happens with the this.webSocket connection.
     */
    webSocketError(evt) {
        console.log('this.webSocket Error: ' + evt.data);
        if (this.context.webSocketErrorCallback !== undefined && this.context.isFunction(this.context.webSocketErrorCallback)) {
            this.context.webSocketErrorCallback(evt);
        }
    }

    /**
     * Function called when the this.webSocket received a message.
     * @param[in] pParams The parameters of the received message
     */
    onwebSocketMessageReceived(pParams) {
        let lJsonResponse = JSON.parse(pParams.data);
        if (lJsonResponse.hasOwnProperty("getValueResponse")) {
            this.context.processGetValueResponse(lJsonResponse["getValueResponse"]);
        } else if (lJsonResponse.hasOwnProperty("getVariableCountResponse")) {
            this.context.processGetVariableCountResponse(lJsonResponse["getVariableCountResponse"])
        } else if (lJsonResponse.hasOwnProperty("onVariableValueChangedNotification")) {
            this.context.processOnVariableValueChangedNotification(lJsonResponse["onVariableValueChangedNotification"]);
        } else if (lJsonResponse.hasOwnProperty("getVariableDefinitionsResponse")) {
            this.context.getVariableDefinitionsCallback(lJsonResponse["getVariableDefinitionsResponse"]);
        }
    }

    /**
     * Gets the value of a variable.
     * @param[in] pVariableName The name of the variable to the value from the DDR.
     * @param[in] pCallback A callback function called when the this.webSocket receive the value of the variable.
     */
    getVariableValue(pVariableName, pCallback) {

        if (typeof pVariableName !== "string") {
            //throw "The first parameter of the getVariableValue must be a string";
        }

        if (!this.isFunction(pCallback)) {
            //throw "The second parameter of the getVariableValue must be a function";
        }

        if (this.getVariableValueCallbackArray[pVariableName] === undefined) {
            this.getVariableValueCallbackArray[pVariableName] = [];
        }

        this.getVariableValueCallbackArray[pVariableName].push(pCallback);
        return this.sendGetValueRequest(pVariableName);
    }

    /**
     * Set a variable value
     * @param[in] pVariableName The name of the variable to be updated
     * @param[in] pVariableValue The new variable value
     */
    setVariableValue(pVariableName, pVariableValue) {

        if (typeof pVariableName !== "string") {
            //throw "The first parameter of the setVariableValue must be a string";
        }

        return this.sendSetVariableValueRequest(pVariableName, pVariableValue);
    }

    /**
     * Subscribe the page to the provided variables.
     * @param[in] pVariableNameList The list of variables to subscribe to.
     * @param[in] pCallback A callback function called when the value of a subscribed variable changes.
     * @param[in] pUseTheSameCallbackForAllVariables Set to true when only one callback is used by the application (improved performance)
     */
    subscribeVariablesValue(pVariableNameList, pCallback, pUseTheSameCallbackForAllVariables) {
        //console.log(`pVariableNameList: ${pVariableNameList} \n, pCallback: ${pCallback} \n, pUseTheSameCallbackForAllVariables: ${pUseTheSameCallbackForAllVariables} `)
        if (pVariableNameList.constructor !== Array) {
            //throw "The first parameter of the subscribeVariablesValue must be an array";
        }

        if (!this.isFunction(pCallback)) {
            //throw "The second parameter of the subscribeVariablesValue must be a function";
        }

        if (pUseTheSameCallbackForAllVariables) {
            this.onVariableValueChangedNotificationCallback = pCallback
        }

        for (let index = 0; index < pVariableNameList.length; ++index) {
            let lVariableName = pVariableNameList[index];

            if (typeof lVariableName !== "string") {
                console.error("The values inside pVariableNameList must be strings");
            }

            if (this.onVariableValueChangedNotificationCallback === undefined) {
                if (this.onVariableValueChangedNotificationCallbackArray[lVariableName] === undefined) {
                    this.onVariableValueChangedNotificationCallbackArray[lVariableName] = [];
                }

                this.onVariableValueChangedNotificationCallbackArray[lVariableName].push(pCallback);
            }
        }

        return this.sendSubscribeVariablesRequest(pVariableNameList);
    }

    /**
     * Sends the getValueRequest to the WebDDR this.webSocket server.
     * @param[in] pVariableName The name of the variable to get the value of.
     */
    sendGetValueRequest(pVariableName) {
        let lSuccess = false;

        if (this.webSocket !== undefined && this.webSocket.readyState === this.webSocket.OPEN) {
            let params = {
                getValueRequest: pVariableName
            };
            this.webSocket.send(JSON.stringify(params));
            lSuccess = true;
        }

        return lSuccess;
    }

    /**
     * Send a setVariableValueRequest to the WebDDR this.webSocket server.
     * @param[in] pVariableName The name of the variable to be updated
     * @param[in] pVariableValue The new variable value
     */
    sendSetVariableValueRequest(pVariableName, pVariableValue) {
        let lSuccess = false;
        let lVariable = { variableName: pVariableName, variableValue: pVariableValue };

        if (this.webSocket !== undefined && this.webSocket.readyState === this.webSocket.OPEN) {
            let params = {
                setVariableValueRequest: lVariable
            };

            this.webSocket.send(JSON.stringify(params));
            lSuccess = true;
        }

        return lSuccess;
    }


    /**
     * Sends the getVariableCountRequest to the WebDDR this.webSocket server.
     */
    sendGetVariableCountRequest() {
        let lSuccess = false;
        if (this.webSocket !== undefined && this.webSocket.readyState === this.webSocket.OPEN) {
            let params = {
                getVariableCountRequest: {}
            };
            this.webSocket.send(JSON.stringify(params));
            lSuccess = true;
        }

        return lSuccess;
    }

    /**
     * Sends the getVariableDefinitionsRequest to the WebDDR this.webSocket server.
     */
    sendGetVariableDefinitionsRequest(pCallback) {
        let lSuccess = false;
        this.getVariableDefinitionsCallback = pCallback
        if (this.webSocket !== undefined && this.webSocket.readyState === this.webSocket.OPEN) {
            let params = {
                getVariableDefinitionsRequest: {}
            };
            this.webSocket.send(JSON.stringify(params));
            lSuccess = true;
        }

        return lSuccess;
    }

    /**
     * Sends the subscribeVariablesRequest to the WebDDR this.webSocket server.
     * @param[in] pVariableNameList A list of variables name to subscribe.
     */
    sendSubscribeVariablesRequest(pVariableNameList) {
        let lSuccess = false;

        if (this.webSocket !== undefined && this.webSocket.readyState === this.webSocket.OPEN) {
            let params = {
                subscribeVariablesRequest: []
            };
            for (let index = 0; index < pVariableNameList.length; ++index) {
                params.subscribeVariablesRequest.push(pVariableNameList[index]);
            }
            this.webSocket.send(JSON.stringify(params));
            lSuccess = true;
        }

        return lSuccess;
    }

    /**
     * Process a getValueResponse from the WebDDR.
     * @param[in] pVariable The variable name and value from the getValueResponse.
     */
    processGetValueResponse(pVariable) {
        let lVariable = [];
        lVariable.name = pVariable["variableName"];
        lVariable.value = pVariable["variableValue"];

        /* Javascript has only one thread so no need for concurrency checks. */
        while (this.getVariableValueCallbackArray[lVariable.name].length !== 0) {
            // shift is the JS equivalent of pop it gets and removes the first element of an array.
            let lCallBack = this.getVariableValueCallbackArray[lVariable.name].shift();
            lCallBack(lVariable);
        }
    }

    /**
     * Process a getVariableCountResponse from the WebDDR.
     * @param[in] pVariableCount The count of DDR variables.
     */
    processGetVariableCountResponse(pVariableCount) {
        /* TODO: [Future Sprint] Implement me. */
    }

    /**
     * Process a onVariableValueChangedNotification from the WebDDR.
     * @param[in] pVariable The variable name and value from the onVariableValueChangedNotification.
     */
    processOnVariableValueChangedNotification(pVariable) {

        let lVariable = [];
        lVariable.name = pVariable["variableName"];
        lVariable.value = pVariable["variableValue"];

        // Javascript has only one thread so no need for concurrency checks.

        if (this.onVariableValueChangedNotificationCallback !== undefined) {
            // Use the global callback
            this.onVariableValueChangedNotificationCallback(lVariable);
        }
        else {
            // Find the specific callback to be used
            for (let j = 0; j < this.onVariableValueChangedNotificationCallbackArray[lVariable.name].length; ++j) {
                let lCallBack = this.onVariableValueChangedNotificationCallbackArray[lVariable.name][j];
                lCallBack(lVariable);
            }
        }
    }

    /*
     * This function checks whether the parameter is a function or not.
     * @param[in] The object to check.
     * @return True if the object is a function, false if not. */
    isFunction(functionToCheck) {
        let getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    flush() {
        if (this.webSocket && this.webSocket.readyState === this.webSocket.OPEN) {
            console.log('Flushing : Flushing all WebDDR variables and closing connection !');
            this.subscribeVariableCallBackArray = [];
            this.onwebSocketConnectedCallback = undefined;
            this.onwebSocketErrorCallback = undefined;
            this.getVariableValueCallbackArray = [];
            this.gGetVariableValueCallbackArray = undefined;
            this.onVariableValueChangedNotificationCallbackArray = [];
            this.onVariableValueChangedNotificationCallback = undefined;
            this.webSocket.onclose = undefined;
            this.webSocket.context = undefined;
            this.webSocket.close();
            this.webSocket = undefined;
        }
    }
}
const webDDR = new WebDDR(DEFAUL_WEB_DDR_URI);