// ==UserScript==
// @name         Kusto web +
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://dataexplorer.azure.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let ClientV1Query = [
    'let E = (Event: string , Action: string) // Red',
    '{',
    'Action in ("onError", "onAudioError", "User send shaker") or Event in ("onError")',
    '};',
    'let W = (Event: string , Action: string) // Yellow',
    '{',
    'Action in ("quitCommute", "triggerLoadingTimer", "setAutoPlay") or Event in ("commuteHandleResponse", "becomeInactive", "becomeActive")',
    '};',
    'let I = (Event: string , Action: string) // Blue',
    '{',
    'Action in ("onAudioOutputStateChanged", "actionComplete", "onSkillResponse", "sendCoalescedEvent", "onUserEventStartExecuted", "onStateChanged") or Event in ("csdk_received_message", "csdk_trace", "csdk_tts_first_chunk")',
    '};',
    'omc_ios',
    '| where FeatureSessionId == "43A123BE-D2F0-4787-98F2-CC4A7D5E2F8B"',
    '| where EventInfo_Time < datetime(2020-02-27 17:33:43.0130)',
    '| where IsPartnerEvent == true or Event in ("Conversation", "Audio", "csdk_servicetag", "csdk_received_message", "csdk_tts_first_chunk", "csdk_tts_last_chunk")',
    '| where Event !in ("commuteBatteryLevel")',
    '| where Action !in ("audio_output_stopasync", "audio_output_stopasync_internal", "LogEventDeferred_Internal")',
    '| where Action !in ("refresh_accessToken", "commuteBarNotShow")',
    '| project EventInfo_Time, IsPartnerEvent, Event, Action, Message, Status, CustomInfo, RequestId, TraceId, FeatureFlag, APPSDKVersion, DeviceInfo_Id, FeatureSessionId, channel',
    '| extend Level = case(E(Event, Action), 2, W(Event, Action), 3, I(Event, Action), 5, 0)',
    '| sort by EventInfo_Time asc '
].join('<br />');


let ClientV2Query = [
    'let E = (Event: string , Action: string) // Red',
    '{',
    'Action in ("onError", "onAudioError", "User send shaker") or Event in ("onError")',
    '};',
    'let W = (Event: string , Action: string) // Yellow',
    '{',
    'Action in ("quitCommute", "triggerLoadingTimer", "setAutoPlay") or Event in ("commuteHandleResponse", "becomeInactive", "becomeActive")',
    '};',
    'let I = (Event: string , Action: string) // Blue',
    '{',
    'Action in ("onAudioOutputStateChanged", "actionComplete", "onSkillResponse", "sendCoalescedEvent", "onUserEventStartExecuted", "onStateChanged") or Event in ("csdk_received_message", "csdk_trace", "csdk_tts_first_chunk")',
    '};',
    '// omc_ios',
    '// | where FeatureSessionId == "43A123BE-D2F0-4787-98F2-CC4A7D5E2F8B"',
    '// | where DeviceInfo_Id == "7C140D24-CE91-4B21-974F-5B906B5FD923"',
    'AllClientLogs("93DB69FD-3286-4DD4-BB50-954FC32CDE43")',
    '| where EventInfo_Time < datetime(2020-02-27 17:33:43.0130)',
    '| where Event !in ("commuteBatteryLevel")',
    '| where Action !in ("commuteBarDisappear", "commuteBarNotShow", "shouldSkip")',
    '| project EventInfo_Time, Event, Action, Message, Status, CustomInfo, RequestId, DeviceInfo_Id, FeatureSessionId, channel',
    '| extend Level = case(E(Event, Action), 2, W(Event, Action), 3, I(Event, Action), 5, 0)',
    '| sort by EventInfo_Time asc'
].join('<br />');

let UxoWebSocketMessageQuery = [
    'let clientRequestId = cluster("Cortanadiagnosticslogs").database("CompliantCortana").UxoRequest',
    '| where UxoRequestId =~ "0e593358faa6432fa8ab0e2f9249ef4a" // TraceId',
    '| project ClientRequestId;',
    'cluster("Cortanadiagnosticslogs").database("CompliantCortana").UxoWebSocketMessage',
    '| where ClientRequestId in~ (clientRequestId )',
    '| project TIMESTAMP, Direction, Path, Payload, Zone, ClientRequestId'
].join('<br />');

function buildButton(tip) {
    let button = document.createElement("input");
    button.type = "button";

    button.onclick = () => {
        var myWindow = window.open("", "MsgWindow", "width=800,height=600");
        myWindow.document.write(tip);
    }

    return button
}

async function addButtons() {
    await sleep(5000);

    let header = document.getElementsByClassName('page-header')[0];

    if (!header) {
        return;
    }

    console.log('Add Buttons');

    header.appendChild(buildButton(ClientV1Query))
    header.appendChild(buildButton(ClientV2Query))
    header.appendChild(buildButton(UxoWebSocketMessageQuery))
}

(function () {
    'use strict';
    console.log("Running Kusto web +");
    $(document).ready(function () {
        console.log("Document is ready");
        addButtons();
    });
})();
