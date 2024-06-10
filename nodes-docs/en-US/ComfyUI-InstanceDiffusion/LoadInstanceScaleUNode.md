# LoadInstanceScaleUNode
## Documentation
- Class name: `LoadInstanceScaleUNode`
- Category: `instance/loaders`
- Output node: `False`

This node is designed to load a specific instance of the ScaleU model from a given filename. It utilizes a checkpoint retrieval mechanism to load the model's state and prepares the ScaleU networks for subsequent use in the instance diffusion process.
## Input types
### Required
- **`model_filename`**
    - Specifies the filename of the model to be loaded. This parameter is crucial as it determines which specific ScaleU model instance is retrieved and loaded for use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`scaleu`**
    - Comfy dtype: `SCALEU`
    - Returns a dictionary containing a list of ScaleU model instances, ready for integration into the instance diffusion framework.
    - Python dtype: `Dict[str, List[torch.nn.Module]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadInstanceScaleUNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_filename": (get_model_list(constants.INSTANCE_SCALEU_DIR),),
        }}

    RETURN_TYPES = ("SCALEU",)
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, model_filename: str):
        checkpoint = load_checkpoint(
            constants.INSTANCE_SCALEU_DIR, model_filename)
        scaleu_list = prepare_scaleu_nets(checkpoint)
        scaleu = {
            'model_list': scaleu_list
        }
        return (scaleu,)

```
