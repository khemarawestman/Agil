

import '@testing-library/jest-dom';

test('mocks a POST request', async () => {
  const bookingInfo = { date: '2024-06-12T18:00', lanes: 1, people: 4 };

  const response = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
    method: 'POST',
    headers: {
      'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookingInfo }),
  });

  const result = await response.json();
  expect(response.status).toBe(201);
  expect(result).toEqual({
    active: true,
    id: 'STR2101YPJD',
    lanes: "1",  
    people: "1",  
    price: 220,
    shoes: ["42"],  
    when: '2024-06-06T12:00',
  });
});
