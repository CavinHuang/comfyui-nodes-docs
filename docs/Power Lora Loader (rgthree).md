
# Documentation
- Class name: Power Lora Loader (rgthree)
- Category: rgthree
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Power Lora Loader节点旨在通过动态添加多个Lora修改来增强模型和CLIP。它提供了一个灵活的接口，用于将Loras集成到现有结构中，从而扩展其功能和性能。

# Input types
## Required
- model
    - model参数代表将添加Loras的模型。它对于定义将通过附加功能增强的基本结构至关重要。
    - Comfy dtype: MODEL
    - Python dtype: tuple
- clip
    - clip参数表示将用Loras修改的clip。它在指定增强目标方面起着关键作用，确保正确应用修改。
    - Comfy dtype: CLIP
    - Python dtype: tuple

# Output types
- MODEL
    - 返回应用了Loras的修改后的模型，反映了所做的增强。
    - Comfy dtype: MODEL
    - Python dtype: tuple
- CLIP
    - 返回集成了Loras的增强clip，展示了所做的修改。
    - Comfy dtype: CLIP
    - Python dtype: tuple


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
