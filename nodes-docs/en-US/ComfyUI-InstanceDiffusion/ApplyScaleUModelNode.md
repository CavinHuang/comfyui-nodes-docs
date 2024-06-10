# Apply Instance Diffusion ScaleU
## Documentation
- Class name: `ApplyScaleUModelNode`
- Category: `instance`
- Output node: `False`

This node is designed to enhance the capabilities of a given model by applying a ScaleU patch, which adjusts the model's output based on the ScaleU technique. This technique involves modifying the model's internal processing to incorporate additional scaling adjustments, aiming to improve the model's performance or output quality.
## Input types
### Required
- **`model`**
    - The model to which the ScaleU patch will be applied. This parameter is crucial as it determines the base model that will be enhanced with the ScaleU technique, affecting the overall execution and results of the node.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`scaleu`**
    - The ScaleU configuration to be applied to the model. This parameter is essential for defining the specific scaling adjustments and enhancements that will be made to the model, influencing its performance and output characteristics.
    - Comfy dtype: `SCALEU`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The enhanced model with the ScaleU patch applied. This output reflects the modifications made to the original model, showcasing the improvements or adjustments resulting from the application of the ScaleU technique.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyScaleUModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL",),
            "scaleu": ("SCALEU",),
        }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply"

    CATEGORY = "instance"

    def apply(self, model, scaleu):
        # Validate patches dict is setup correctly
        transformer_options = model.model_options['transformer_options']
        if 'patches' not in transformer_options:
            transformer_options['patches'] = {}

        if 'output_block_patch' not in transformer_options['patches']:
            transformer_options['patches']['output_block_patch'] = []

        # Add scaleu patch to model patches
        scaleu_nets = scaleu['model_list']
        # TODO make this load in KSampler
        for i, scaleu in enumerate(scaleu_nets):
            scaleu_nets[i] = scaleu.to(
                comfy.model_management.get_torch_device())
        transformer_options['patches']['output_block_patch'].append(
            get_scaleu_patch(scaleu_nets))
        return (model,)

```
