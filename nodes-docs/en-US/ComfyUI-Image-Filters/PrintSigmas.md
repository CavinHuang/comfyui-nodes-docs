---
tags:
- SigmaScheduling
---

# PrintSigmas
## Documentation
- Class name: `PrintSigmas`
- Category: `utils`
- Output node: `True`

The `PrintSigmas` node is designed for utility purposes within a computational graph, specifically to print and return the values of sigma parameters. This functionality aids in debugging and monitoring the flow of sigma values through the graph, providing a simple yet effective means of outputting these values for inspection.
## Input types
### Required
- **`sigmas`**
    - The `sigmas` parameter represents the sigma values to be printed and returned. It plays a crucial role in the node's operation by serving as the data that is both outputted for user inspection and passed through the node for potential further use.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `torch.Tensor`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - Returns the same sigma values that were input, allowing for further processing or inspection elsewhere in the computational graph.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PrintSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "sigmas": ("SIGMAS",)
            }}
    RETURN_TYPES = ("SIGMAS",)
    FUNCTION = "notify"
    OUTPUT_NODE = True
    CATEGORY = "utils"
    
    def notify(self, sigmas):
        print(sigmas)
        return (sigmas,)

```
