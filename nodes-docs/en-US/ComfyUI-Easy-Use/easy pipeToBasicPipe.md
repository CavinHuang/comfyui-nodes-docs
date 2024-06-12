---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# Pipe -> BasicPipe
## Documentation
- Class name: `easy pipeToBasicPipe`
- Category: `EasyUse/Pipe`
- Output node: `False`

The `pipeToBasicPipe` node is designed to transform a complex pipeline configuration into a simplified basic pipeline structure. It extracts essential components from the input pipeline, such as model, clip, vae, and conditioning information, and repackages them into a more streamlined format suitable for further processing or analysis.
## Input types
### Required
- **`pipe`**
    - The `pipe` parameter represents the complex pipeline configuration that is to be simplified. It is essential for determining the components to be extracted and included in the basic pipeline.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The output is a simplified version of the input pipeline, containing only the essential components such as model, clip, vae, and conditioning information.
    - Python dtype: `Tuple[Any, ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class pipeToBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
            },
            "hidden": {"my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("basic_pipe",)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Pipe"

    def doit(self, pipe, my_unique_id=None):
        new_pipe = (pipe.get('model'), pipe.get('clip'), pipe.get('vae'), pipe.get('positive'), pipe.get('negative'))
        del pipe
        return (new_pipe,)

```
