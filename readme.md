# json-merge

given multiple streams of newline delimited JSON data perform a merge/extend on each object in the stream

[![NPM](https://nodei.co/npm/json-merge.png?global=true)](https://nodei.co/npm/json-merge/)
![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)

## usage

```
npm install json-merge -g
json-merge <source1> <source2> [<source3>...]
```

sources can be one of 3 things:

- paths to newline-delimited json data files
- HTTP uris that return newline-delimited json data
- JSONStream selector syntax to be used to parse stdin into a stream of JS objects

## examples

### newline delimited json files

e.g. given a file `a.json`:

```
{"foo": "bar"}
```

and a file `b.json`:

```
{"taco": "pizza"}
```

then running:

```
json-merge a.json b.json
```

would output:

```
{"foo": "bar", "taco": "pizza"}
```

### JSONStream parsing

you can also specify [JSONStream](http://npmjs.org/JSONStream) query syntax and `json-merge` will parse stdin

e.g. if `foobar.json` is:

```
{
  "data": [
    {
      "a": {
        "all": "lowercase"
      },
      "b": {
        "ALL": "CAPS"
      }
    }
  ]
}
```

then running:

```
cat foobar.json | json-merge "data.*.a" "data.*.b"
```

would output:

```
{"all":"lowercase","ALL":"CAPS"}
```
