---
tags:
- ControlNet
- Weight
---

# IPAdapter Combine Weights
## Documentation
- Class name: `IPAdapterCombineWeights`
- Category: `ipadapter/utils`
- Output node: `False`

The IPAdapterCombineWeights node is designed to aggregate and combine weight values from two different sources, providing a unified set of weights and their count. This functionality is essential for operations that require the blending or merging of weight parameters from distinct inputs, facilitating more nuanced control over weight-based computations or adjustments.
## Input types
### Required
- **`weights_i`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
## Output types
- **`weights`**
    - Comfy dtype: `FLOAT`
    - The combined list of weights resulting from merging weights_1 and weights_2, reflecting the aggregate influence of both inputs.
    - Python dtype: `List[float]`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of weights in the combined list, providing a quantitative measure of the outcome of the combination process.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterCombineWeights:
    @classmethod
    def INPUT_TYPES(s):
        return {
        "required": {
            "weights_1": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05 }),
            "weights_2": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05 }),
        }}
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("weights", "count")
    FUNCTION = "combine"
    CATEGORY = "ipadapter/utils"

    def combine(self, weights_1, weights_2):
        if not isinstance(weights_1, list):
            weights_1 = [weights_1]
        if not isinstance(weights_2, list):
            weights_2 = [weights_2]
        weights = weights_1 + weights_2

        return (weights, len(weights), )

```
