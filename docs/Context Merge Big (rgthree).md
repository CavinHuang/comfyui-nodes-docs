
# Documentation
- Class name: Context Merge Big (rgthree)
- Category: rgthree
- Output node: False

Context Merge Big (rgthree) 节点旨在将多个上下文对象合并成一个全面的上下文。它智能地组合输入，在出现重叠的情况下，后面的上下文会覆盖前面的上下文，从而确保上下文数据的无缝整合。

# Input types
## Required
## Optional
- ctx_i
    - 这个参数代表需要合并的上下文对象。可以有多个这样的输入，每个都会被整合到最终的上下文中。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: unknown

# Output types
- CONTEXT
    - 输出合并后的综合上下文对象。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: unknown
- MODEL
    - 输出可能包含的模型信息。
    - Comfy dtype: MODEL
    - Python dtype: unknown
- CLIP
    - 输出可能包含的CLIP模型信息。
    - Comfy dtype: CLIP
    - Python dtype: unknown
- VAE
    - 输出可能包含的VAE模型信息。
    - Comfy dtype: VAE
    - Python dtype: unknown
- POSITIVE
    - 输出正面条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- NEGATIVE
    - 输出负面条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- LATENT
    - 输出潜在空间信息。
    - Comfy dtype: LATENT
    - Python dtype: unknown
- IMAGE
    - 输出图像信息。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- SEED
    - 输出随机种子值。
    - Comfy dtype: INT
    - Python dtype: unknown
- STEPS
    - 输出步数信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- STEP_REFINER
    - 输出步数优化器信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- CFG
    - 输出CFG（配置）信息。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- CKPT_NAME
    - 输出检查点名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- SAMPLER
    - 输出采样器信息。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- SCHEDULER
    - 输出调度器信息。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- CLIP_WIDTH
    - 输出CLIP宽度信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- CLIP_HEIGHT
    - 输出CLIP高度信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- TEXT_POS_G
    - 输出全局正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: unknown
- TEXT_POS_L
    - 输出局部正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: unknown
- TEXT_NEG_G
    - 输出全局负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: unknown
- TEXT_NEG_L
    - 输出局部负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: unknown
- MASK
    - 输出掩码信息。
    - Comfy dtype: MASK
    - Python dtype: unknown
- CONTROL_NET
    - 输出ControlNet相关信息。
    - Comfy dtype: CONTROL_NET
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextMergeBig:
  """The Context Merge Big node."""

  NAME = get_name("Context Merge Big")
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

  RETURN_TYPES = ALL_CTX_RETURN_TYPES
  RETURN_NAMES = ALL_CTX_RETURN_NAMES
  FUNCTION = "merge"

  def merge(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Merges any non-null passed contexts; later ones overriding earlier.
    """
    ctx = merge_new_context(ctx_01, ctx_02, ctx_03, ctx_04, ctx_05)

    return get_context_return_tuple(ctx)

```
