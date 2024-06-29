---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# pipe > basic_pipe
## Documentation
- Class name: `ttN pipe2BASIC`
- Category: `ttN/pipe`
- Output node: `False`

The ttN pipe2BASIC node is designed to simplify the structure of a given pipeline by extracting and repackaging its core components into a basic pipeline format. This process facilitates easier manipulation and understanding of the pipeline's fundamental elements.
## Input types
### Required
- **`pipe`**
    - The 'pipe' input is the pipeline to be simplified, containing various components such as models, clips, and VAEs. It serves as the primary data structure for transformation into a basic pipeline format.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The 'basic_pipe' output is a simplified version of the input pipeline, containing only its essential components such as model, clip, VAE, and positive and negative conditioning.
    - Python dtype: `Tuple[Any, ...]`
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The 'pipe' output returns the original pipeline as received in the input, allowing for further manipulation or inspection.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_2BASIC:
    version = '1.1.0'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                },
            "hidden": {"ttNnodeVersion": ttN_pipe_2BASIC.version},
            }

    RETURN_TYPES = ("BASIC_PIPE", "PIPE_LINE",)
    RETURN_NAMES = ("basic_pipe", "pipe",)
    FUNCTION = "flush"

    CATEGORY = "ttN/pipe"
    
    def flush(self, pipe):
        basic_pipe = (pipe.get('model'), pipe.get('clip'), pipe.get('vae'), pipe.get('positive'), pipe.get('negative'))
        return (basic_pipe, pipe, )

```
