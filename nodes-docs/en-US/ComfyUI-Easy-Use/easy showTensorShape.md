# Show Tensor Shape
## Documentation
- Class name: `easy showTensorShape`
- Category: `EasyUse/Logic`
- Output node: `True`

The `showTensorShape` node is designed to analyze and display the shape of tensor data structures within a given input. It abstracts the complexity of tensor operations, providing a straightforward way to visualize the dimensions and structure of tensors, which is crucial for debugging and understanding data flow in tensor-based computations.
## Input types
### Required
- **`tensor`**
    - The `tensor` parameter is the primary input for the `showTensorShape` node, representing the tensor whose shape is to be analyzed and displayed. This parameter is essential for the node's operation as it directly influences the output by determining the structure and dimensions of the tensor to be visualized.
    - Comfy dtype: `*`
    - Python dtype: `torch.Tensor`
### Optional
## Output types
- **`ui`**
    - The `ui` output parameter provides a user interface element that visually represents the shape of the input tensor, making it easier to understand the tensor's dimensions and structure at a glance.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class showTensorShape:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"tensor": (AlwaysEqualProxy("*"),)}, "optional": {},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO"
               }}

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = "log_input"
    CATEGORY = "EasyUse/Logic"

    def log_input(self, tensor, unique_id=None, extra_pnginfo=None):
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

        return {"ui": {"text": shapes}}

```
