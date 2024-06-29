---
tags:
- LoRA
---

# Power Lora Loader (rgthree)
## Documentation
- Class name: `Power Lora Loader (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Power Lora Loader node is designed to enhance models and clips by dynamically adding multiple Lora modifications. It offers a flexible interface for integrating Loras into existing structures, thereby extending their capabilities and performance.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the model to which Loras will be added. It is essential for defining the base structure that will be enhanced with additional features.
    - Comfy dtype: `MODEL`
    - Python dtype: `tuple`
- **`clip`**
    - The 'clip' parameter signifies the clip to be modified with Loras. It plays a crucial role in specifying the target for enhancements, ensuring the modifications are applied correctly.
    - Comfy dtype: `CLIP`
    - Python dtype: `tuple`
### Optional
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Returns the modified model with Loras applied, reflecting the enhancements made.
    - Python dtype: `tuple`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - Returns the enhanced clip with Loras integrated, showcasing the modifications.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreePowerLoraLoader:
  """ The Power Lora Loader is a powerful, flexible node to add multiple loras to a model/clip."""

  NAME = get_name('Power Lora Loader')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "model": ("MODEL",),
        "clip": ("CLIP",),
      },
      # Since we will pass any number of loras in from the UI, this needs to always allow an
      "optional": ContainsAnyDict(),
      "hidden": {},
    }

  RETURN_TYPES = ("MODEL", "CLIP")
  RETURN_NAMES = ("MODEL", "CLIP")
  FUNCTION = "load_loras"

  def load_loras(self, model, clip, **kwargs):
    """Loops over the provided loras in kwargs and applies valid ones."""
    for key, value in kwargs.items():
      key = key.upper()
      if key.startswith('LORA_') and 'on' in value and 'lora' in value and 'strength' in value:
        strength_model = value['strength']
        # If we just passed one strtength value, then use it for both, if we passed a strengthTwo
        # as well, then our `strength` will be for the model, and `strengthTwo` for clip.
        strength_clip = value['strengthTwo'] if 'strengthTwo' in value and value[
          'strengthTwo'] is not None else strength_model
        if value['on'] and (strength_model != 0 or strength_clip != 0):
          lora = get_lora_by_filename(value['lora'], log_node=self.NAME)
          if lora is not None:
            model, clip = LoraLoader().load_lora(model, clip, lora, strength_model, strength_clip)

    return (model, clip)

```
