# 3D Bin Packing JavaScript Library

A powerful JavaScript library for solving 3D bin packing problems. This library helps you efficiently pack items of different sizes into containers (bins) while optimizing space usage.

## Features

- 3D bin packing algorithm implementation
- Support for multiple bins
- Customizable bin and item dimensions
- Space optimization
- Easy to integrate and use
- Written in modern JavaScript
- Fully tested

## Installation

Using npm:

```bash
npm install binpackingjs
```

Using yarn:

```bash
yarn add binpackingjs
```

## Usage

```javascript
import { BP3D } from "binpackingjs";

// Create a new packer
const packer = new BP3D.Packer();

// Define bins (containers)
const bin1 = new BP3D.Bin(100, 100, 100, 100); // width, height, depth, maxWeight
packer.addBin(bin1);

// Add items to be packed
const item1 = new BP3D.Item(20, 20, 20, 1, "Item 1"); // width, height, depth, weight, name
const item2 = new BP3D.Item(30, 30, 30, 2, "Item 2");
packer.addItem(item1);
packer.addItem(item2);

// Pack items into bins
packer.pack();

// Get the results
const bins = packer.bins;
```

## API Reference

### Packer

The main class that handles the packing algorithm.

Methods:

- `addBin(bin)`: Add a bin to pack items into
- `addItem(item)`: Add an item to be packed
- `pack()`: Execute the packing algorithm

### Bin

Represents a container that items can be packed into.

Properties:

- `width`: Width of the bin
- `height`: Height of the bin
- `depth`: Depth of the bin
- `maxWeight`: Maximum weight capacity
- `items`: Array of packed items

### Item

Represents an item to be packed.

Properties:

- `width`: Width of the item
- `height`: Height of the item
- `depth`: Depth of the item
- `weight`: Weight of the item
- `name`: Identifier for the item

## Development

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Build the project
yarn build

# Watch mode for development
yarn dev
```

## Testing

The project includes comprehensive tests. Run them using:

```bash
yarn test
```

## License

MIT

## Author

Long Nguyen

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you have any questions or need help, please open an issue in the GitHub repository.
