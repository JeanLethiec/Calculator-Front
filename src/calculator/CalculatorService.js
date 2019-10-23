export class CalculatorService {
    constructor(httpClient) {
        this.host = "http://localhost:8081";
        this.httpClient = httpClient || fetch;
    }

    saveOperations(operations) {
        return Promise.all(
            operations.map(operation => this.saveOperation(operation))
        );
    }

    saveOperation(operation) {
        return this.httpClient(this.host + '/operation', {
            method: 'POST',
            body: JSON.stringify({ value: operation }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
    }

    getHistory() {
        return this.httpClient(this.host + '/operation', {
            method: 'GET',
        }).then(data => data.json());
    }
}
