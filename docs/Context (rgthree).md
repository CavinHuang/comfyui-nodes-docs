
# Documentation
- Class name: Context (rgthree)
- Category: rgthree
- Output node: False

Context (rgthree)节点是一个基础性的上下文节点，旨在与1.5版本的应用程序和其他上下文节点高度兼容。它主要负责将输入的上下文参数转换为结构化的输出，以适应大多数使用场景，同时保持前向和后向兼容性。

# Input types
## Required
## Optional
- base_ctx
    - 作为转换或增强的基础上下文。它是转换过程的起点，允许整合或修改额外的上下文参数。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: Optional[Dict[str, Any]]
- model
    - 指定在上下文中使用的模型，允许定制化和灵活处理。
    - Comfy dtype: MODEL
    - Python dtype: str
- clip
    - 定义要合并到上下文中的CLIP模型，增强处理能力。
    - Comfy dtype: CLIP
    - Python dtype: str
- vae
    - 指示要包含在上下文中的VAE模型，contributes to the generation process。
    - Comfy dtype: VAE
    - Python dtype: str
- positive
    - 正向条件因素，用于引导生成朝向期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负向条件因素，用于引导生成远离不期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 指定在上下文中使用的潜在空间表示，支持高级操作。
    - Comfy dtype: LATENT
    - Python dtype: str
- images
    - 定义要包含在上下文中的图像，允许集成视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: str
- seed
    - 设置随机数生成的种子，确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- CONTEXT
    - Comfy dtype: RGTHREE_CONTEXT
    - 为各种应用优化的结构化输出上下文。
    - Python dtype: Dict[str, Any]
- MODEL
    - Comfy dtype: MODEL
    - 上下文中使用的模型，反映指定的输入。
    - Python dtype: str
- CLIP
    - Comfy dtype: CLIP
    - 根据输入规范合并到上下文中的CLIP模型。
    - Python dtype: str
- VAE
    - Comfy dtype: VAE
    - 根据输入参数包含在上下文中的VAE模型。
    - Python dtype: str
- POSITIVE
    - Comfy dtype: CONDITIONING
    - 应用于上下文中的正向条件因素，引导生成过程。
    - Python dtype: str
- NEGATIVE
    - Comfy dtype: CONDITIONING
    - 用于避免不期望结果的负向条件因素。
    - Python dtype: str
- LATENT
    - Comfy dtype: LATENT
    - 用于高级操作的潜在空间表示。
    - Python dtype: str
- IMAGE
    - Comfy dtype: IMAGE
    - 集成到上下文中的图像，包含视觉数据。
    - Python dtype: str
- SEED
    - Comfy dtype: INT
    - 用于上下文中随机数生成的种子，确保一致性。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContext:
  """The initial Context node.

  For now, this nodes' outputs will remain as-is, as they are perfect for most 1.5 application, but
  is also backwards compatible with other Context nodes.
  """

  NAME = get_name("Context")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {},
      "optional": ORIG_CTX_OPTIONAL_INPUTS,
      "hidden": {
        "version": "FLOAT"
      },
    }

  RETURN_TYPES = ORIG_CTX_RETURN_TYPES
  RETURN_NAMES = ORIG_CTX_RETURN_NAMES
  FUNCTION = "convert"

  def convert(self, base_ctx=None, **kwargs):  # pylint: disable = missing-function-docstring
    ctx = new_context(base_ctx, **kwargs)
    return get_orig_context_return_tuple(ctx)

```
