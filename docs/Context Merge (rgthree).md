
# Documentation
- Class name: Context Merge (rgthree)
- Category: rgthree
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Context Merge (rgthree) 节点设计用于将多个上下文输入整合成一个统一的上下文输出。它系统性地合并提供的上下文，允许后面的上下文覆盖先前的值，从而实现动态上下文管理和更新。

# Input types
## Optional
- ctx_i
    - 上下文输入，可以有多个。每个输入都可能包含不同的上下文信息，这些信息将被合并到最终的输出中。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: unknown

# Output types
- CONTEXT
    - 合并后的统一上下文输出。后面的上下文可能会覆盖前面的上下文中的值。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: dict
- MODEL
    - 合并上下文中包含的模型信息。
    - Comfy dtype: MODEL
    - Python dtype: dict
- CLIP
    - 合并上下文中包含的CLIP模型设置。
    - Comfy dtype: CLIP
    - Python dtype: dict
- VAE
    - 合并上下文中包含的VAE模型设置。
    - Comfy dtype: VAE
    - Python dtype: dict
- POSITIVE
    - 合并上下文中包含的正面条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- NEGATIVE
    - 合并上下文中包含的负面条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- LATENT
    - 合并上下文中包含的潜在空间信息。
    - Comfy dtype: LATENT
    - Python dtype: dict
- IMAGE
    - 合并上下文中包含的图像数据。
    - Comfy dtype: IMAGE
    - Python dtype: dict
- SEED
    - 合并上下文中包含的随机数生成种子。
    - Comfy dtype: INT
    - Python dtype: dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextMerge:
  """The Context Merge Big node."""

  NAME = get_name("Context Merge")
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
  FUNCTION = "merge"

  def merge(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Merges any non-null passed contexts; later ones overriding earlier.
    """
    ctx = merge_new_context(ctx_01, ctx_02, ctx_03, ctx_04, ctx_05)

    return get_orig_context_return_tuple(ctx)

```
