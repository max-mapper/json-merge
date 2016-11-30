# json-merge

given multiple streams of newline delimited JSON data perform a merge/extend on each object in the stream

[![NPM](https://nodei.co/npm/json-merge.png?global=true)](https://nodei.co/npm/json-merge/)
![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)

## usage

```
npm install json-merge -g
Usage: json-merge <source1> [options] <source2> [options] [<source3>...]

Options
--parse=<s>	 Parse the precedent source with <s>
--parse=true	Parse the precedent source with JSONStream
```

sources can be one of 3 things:

- paths to newline-delimited json data files
- HTTP uris that return newline-delimited json data
- JSONStream selector syntax to be used to parse stdin into a stream of JS objects
- Any of the above in standard JSON form with `--parse=true`

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

### Parsing different sources

A given a file `food1.json`:

```
{
  "salty": 
    {
      "tacos": "muybien",
      "pretzel": "jawohl"
    }
}

```

and a file `food2.json`:

```
{
  "sweet":
    {
      "waffle": "delicious",
      "pancake": "yummy"
    }
}
```

then running:

```
json-merge food1.json --parse="salty" food2.json --parse="sweet"
```

would output:

```
{"tacos":"muybien","pretzel":"jawohl","waffle":"delicious","pancake":"yummy"}
