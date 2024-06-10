---
tags:
- RandomGeneration
- Seed
---

# Seed String (Mikey)
## Documentation
- Class name: `Seed String`
- Category: `Mikey/Utils`
- Output node: `False`

The Seed String node is designed to convert a numerical seed value into its string representation. This transformation facilitates the use of the seed in contexts where a string format is required, enhancing compatibility and ease of integration with various systems or processes.
## Input types
### Required
- **`seed`**
    - The seed parameter is a numerical value that serves as the input for conversion into a string. This seed is crucial for ensuring consistent results across different executions or for seeding random number generators in a predictable manner.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `INT`
    - The original numerical seed value, unchanged and passed through from the input.
    - Python dtype: `int`
- **`seed_string`**
    - Comfy dtype: `STRING`
    - The string representation of the input seed, enabling its use in string-based contexts or systems.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntegerAndString:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 0xffffffffffffffff})}}

    RETURN_TYPES = ('INT','STRING')
    RETURN_NAMES = ('seed','seed_string')
    FUNCTION = 'output'
    CATEGORY = 'Mikey/Utils'

    def output(self, seed):
        seed_string = str(seed)
        return (seed, seed_string,)

```
