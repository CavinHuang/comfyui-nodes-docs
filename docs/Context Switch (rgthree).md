
# Documentation
- Class name: Context Switch (rgthree)
- Category: rgthree
- Output node: False

Context Switch (rgthree)节点旨在通过从一组提供的上下文中选择第一个非空上下文来简化上下文管理。这一功能确保了有效确定后续操作的活动上下文，从而在各种处理流程中实现更流畅的转换和管理。

# Input types
## Required
## Optional
- ctx_i
    - 作为提供给节点的任何上下文的通用占位符。节点按顺序评估每个上下文，直到找到第一个非空上下文，然后选择该上下文作为输出。这种方法允许根据上下文内容的可用性进行灵活和动态的上下文切换。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: dict

# Output types
- CONTEXT
    - 全面的上下文输出，包括根据找到的第一个非空上下文的各个方面，如模型配置、图像处理参数和条件信息等。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: dict
- MODEL
    - 输出与模型相关的上下文信息。
    - Comfy dtype: MODEL
    - Python dtype: str
- CLIP
    - 输出CLIP模型配置上下文。
    - Comfy dtype: CLIP
    - Python dtype: str
- VAE
    - 输出VAE模型配置上下文。
    - Comfy dtype: VAE
    - Python dtype: str
- POSITIVE
    - 输出正面条件上下文。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- NEGATIVE
    - 输出负面条件上下文。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- LATENT
    - 输出潜在空间配置上下文。
    - Comfy dtype: LATENT
    - Python dtype: str
- IMAGE
    - 输出图像处理上下文。
    - Comfy dtype: IMAGE
    - Python dtype: str
- SEED
    - 输出随机数生成上下文的种子值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextSwitch:
  """The initial Context Switch node.

  For now, this will remain as-is but is otherwise backwards compatible with other Context nodes
  outputs.
  """

  NAME = get_name("Context Switch")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {},
      "optional": {
        "ctx_01": ("RGTHREE_CONTEXT",),
        "ctx_02": ("RGTHREE_CONTEXT",),
        "ctx_03": ("RGTHREE_CONTEXT",),
        "ctx_04": ("RGTHREE_CONTEXT",),
        "ctx_05": ("RGTHREE_CONTEXT",),
      },
    }

  RETURN_TYPES = ORIG_CTX_RETURN_TYPES
  RETURN_NAMES = ORIG_CTX_RETURN_NAMES
  FUNCTION = "switch"

  def switch(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Chooses the first non-empty Context to output.

    As of right now, this returns the "original" context. We could expand it, or create another
    "Context Big Switch" and have all the outputs...
    """
    ctx = None
    if not is_context_empty(ctx_01):
      ctx = ctx_01
    elif not is_context_empty(ctx_02):
      ctx = ctx_02
    elif not is_context_empty(ctx_03):
      ctx = ctx_03
    elif not is_context_empty(ctx_04):
      ctx = ctx_04
    elif not is_context_empty(ctx_05):
      ctx = ctx_05
    return get_orig_context_return_tuple(ctx)

```
