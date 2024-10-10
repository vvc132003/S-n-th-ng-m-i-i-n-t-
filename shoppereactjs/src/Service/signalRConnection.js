import { HubConnectionBuilder } from '@microsoft/signalr';

const createSignalRConnection = () => {
    const connection = new HubConnectionBuilder()
        .withUrl('http://192.168.0.125:7027/thuephonghub')
        .withAutomaticReconnect()
        .build();

    return connection;
};
export { createSignalRConnection };