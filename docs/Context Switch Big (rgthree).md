
# Documentation
- Class name: Context Switch Big (rgthree)
- Category: rgthree
- Output node: False

Context Switch Big节点旨在管理多个上下文输入，选择第一个非空的上下文进行输出。这一功能允许在工作流中进行动态的上下文切换，确保始终传递有效的上下文。

# Input types
## Required
## Optional
- ctx_i
    - 该参数代表多个可选的上下文输入。节点将从这些输入中选择第一个非空的上下文作为输出。这种设计为工作流提供了灵活性，允许动态选择和切换上下文。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: unknown

# Output types
- CONTEXT
    - 输出选定的非空上下文，这是节点的主要输出，用于传递给工作流中的后续节点。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: unknown
- MODEL
    - 输出与选定上下文相关的模型信息。
    - Comfy dtype: MODEL
    - Python dtype: unknown
- CLIP
    - 输出与选定上下文相关的CLIP模型信息。
    - Comfy dtype: CLIP
    - Python dtype: unknown
- VAE
    - 输出与选定上下文相关的VAE模型信息。
    - Comfy dtype: VAE
    - Python dtype: unknown
- POSITIVE
    - 输出与选定上下文相关的正面条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- NEGATIVE
    - 输出与选定上下文相关的负面条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- LATENT
    - 输出与选定上下文相关的潜在空间信息。
    - Comfy dtype: LATENT
    - Python dtype: unknown
- IMAGE
    - 输出与选定上下文相关的图像信息。
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- SEED
    - 输出与选定上下文相关的随机种子信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- STEPS
    - 输出与选定上下文相关的步骤数信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- STEP_REFINER
    - 输出与选定上下文相关的步骤细化器信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- CFG
    - 输出与选定上下文相关的CFG配置信息。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- CKPT_NAME
    - 输出与选定上下文相关的检查点名称信息。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- SAMPLER
    - 输出与选定上下文相关的采样器信息。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- SCHEDULER
    - 输出与选定上下文相关的调度器信息。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- CLIP_WIDTH
    - 输出与选定上下文相关的CLIP宽度信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- CLIP_HEIGHT
    - 输出与选定上下文相关的CLIP高度信息。
    - Comfy dtype: INT
    - Python dtype: unknown
- TEXT_POS_G
    - 输出与选定上下文相关的全局正面文本信息。
    - Comfy dtype: STRING
    - Python dtype: unknown
- TEXT_POS_L
    - 输出与选定上下文相关的局部正面文本信息。
    - Comfy dtype: STRING
    - Python dtype: unknown
- TEXT_NEG_G
    - 输出与选定上下文相关的全局负面文本信息。
    - Comfy dtype: STRING
    - Python dtype: unknown
- TEXT_NEG_L
    - 输出与选定上下文相关的局部负面文本信息。
    - Comfy dtype: STRING
    - Python dtype: unknown
- MASK
    - 输出与选定上下文相关的掩码信息。
    - Comfy dtype: MASK
    - Python dtype: unknown
- CONTROL_NET
    - 输出与选定上下文相关的控制网络信息。
    - Comfy dtype: CONTROL_NET
    - Python dtype: unknown
- ui
    - 节点的输出，即从给定输入中选择的非空上下文。这个输出对于将有效的上下文传递给工作流中的后续节点至关重要。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeContextSwitchBig:
  """The Context Switch Big node."""

  NAME = get_name("Context Switch Big")
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
  FUNCTION = "switch"

  def switch(self, ctx_01=None, ctx_02=None, ctx_03=None, ctx_04=None, ctx_05=None):
    """Chooses the first non-empty Context to output.
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
    return get_context_return_tuple(ctx)

```
