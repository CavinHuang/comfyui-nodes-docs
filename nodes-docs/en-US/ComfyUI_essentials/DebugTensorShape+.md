# 🔧 Tensor Shape Debug
## Documentation
- Class name: `DebugTensorShape+`
- Category: `essentials`
- Output node: `True`

The DebugTensorShape+ node is designed to assist in debugging by printing the shapes of tensors within a given structure, such as lists, dictionaries, or tensors themselves. This functionality aids in understanding the dimensions and structure of data flowing through a model or computation graph.
## Input types
### Required
- **`tensor`**
    - The 'tensor' parameter can be a tensor, list, or dictionary containing tensors. It is crucial for determining the structure and dimensions of the data to be debugged, impacting the node's execution by dictating which shapes are printed.
    - Comfy dtype: `*`
    - Python dtype: `Union[torch.Tensor, List[torch.Tensor], Dict[str, torch.Tensor]]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DebugTensorShape:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "tensor": (any, {}),
            },
        }

    RETURN_TYPES = ()
    FUNCTION = "execute"
    CATEGORY = "essentials"
    OUTPUT_NODE = True

    def execute(self, tensor):
        shapes = []
        def tensorShape(tensor):
            if isinstance(tensor, dict):
                for k in tensor:
                    tensorShape(tensor[k])
            elif isinstance(tensor, list):
                for i in range(len(tensor)):
                    tensorShape(tensor[i])
            elif hasattr(tensor, 'shape'):
                shapes.append(list(tensor.shape))

        tensorShape(tensor)

        print(f"\033[96mShapes found: {shapes}\033[0m")

        return (None,)

```
