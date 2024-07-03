【思考】首先，我需要参考Example中的翻译流程，特别注意原文和译文的对照，准确把握翻译要求。接下来，我将逐字逐句翻译原文，在不遗漏任何信息的基础上，用通俗流畅的现代汉语意译原文。然后我会仔细审视译文，消除偏差和欠缺，使译文更加地道易懂。最后，我将确保译文格式完全符合Example中译文的格式，包括标点符号、代码块、列表、标题等。

【翻译】

# Documentation
- Class name: Context Big (rgthree)
- Category: rgthree
- Output node: False

Context Big节点是一个全面的接口，用于管理系统内的上下文。它提供了广泛的灵活性，允许所有上下文字段既可作为输入，也可作为输出。该节点确保了与其他上下文节点的向后兼容性，促进了系统不同部分之间的无缝集成和交互。

# Input types
## Required
## Optional
- base_ctx
    - 作为基础上下文，可在其上叠加额外的上下文参数，实现上下文数据的聚合和修改。
    - Comfy dtype: RGTHREE_CONTEXT
    - Python dtype: dict or None
- model
    - 指定要使用的模型，有助于根据模型特性定制上下文。
    - Comfy dtype: MODEL
    - Python dtype: str or None
- clip
    - 定义要整合到上下文中的CLIP模型，允许集成CLIP的功能。
    - Comfy dtype: CLIP
    - Python dtype: str or None
- vae
    - 指示要包含的VAE模型，便于在上下文中使用VAE特性。
    - Comfy dtype: VAE
    - Python dtype: str or None
- positive
    - 为上下文设置正面条件，增强上下文对期望结果的特异性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str or None
- negative
    - 建立上下文的负面条件，帮助排除结果中不需要的元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: str or None
- latent
    - 提供要使用的潜在向量，用预定义的潜在空间表示丰富上下文。
    - Comfy dtype: LATENT
    - Python dtype: str or None
- images
    - 在上下文中包含图像，允许整合视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: str or None
- seed
    - 确定随机数生成的种子，确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int or None
- steps
    - 指定操作的步骤数，定义过程的精细度。
    - Comfy dtype: INT
    - Python dtype: int or None
- step_refiner
    - 设置步骤细化器值，微调操作步骤以增强控制。
    - Comfy dtype: INT
    - Python dtype: int or None
- cfg
    - 配置CFG比例，调整条件对生成过程的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float or None
- ckpt_name
    - 从可用选项中选择检查点名称，基于特定模型检查点定制上下文。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str or None
- sampler
    - 选择要使用的采样器，根据特定要求定制采样过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str or None
- scheduler
    - 选择操作的调度器，根据选定的调度策略优化过程流程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str or None
- clip_width
    - 设置CLIP处理的宽度，调整CLIP模型输入的尺寸。
    - Comfy dtype: INT
    - Python dtype: int or None
- clip_height
    - 定义CLIP处理的高度，定制CLIP模型输入的大小。
    - Comfy dtype: INT
    - Python dtype: int or None
- text_pos_g
    - 提供全局正面文本条件，用全局正面文本线索增强上下文。
    - Comfy dtype: STRING
    - Python dtype: str or None
- text_pos_l
    - 提供局部正面文本条件，用局部正面文本线索细化上下文。
    - Comfy dtype: STRING
    - Python dtype: str or None
- text_neg_g
    - 提供全局负面文本条件，通过排除全局负面文本元素改善上下文。
    - Comfy dtype: STRING
    - Python dtype: str or None
- text_neg_l
    - 提供局部负面文本条件，通过避免局部负面文本方面完善上下文。
    - Comfy dtype: STRING
    - Python dtype: str or None
- mask
    - 包含用于选择性处理的掩码，实现上下文内的定向修改。
    - Comfy dtype: MASK
    - Python dtype: str or None
- control_net
    - 整合控制网络，通过额外的控制机制扩展上下文的功能。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str or None

# Output types
- CONTEXT
    - Comfy dtype: RGTHREE_CONTEXT
    - 返回综合上下文，封装所有指定的上下文字段。
    - Python dtype: dict
- MODEL
    - Comfy dtype: MODEL
    - 提供模型上下文，反映指定的模型设置。
    - Python dtype: str
- CLIP
    - Comfy dtype: CLIP
    - 传递CLIP模型上下文，表明CLIP功能的集成。
    - Python dtype: str
- VAE
    - Comfy dtype: VAE
    - 输出VAE模型上下文，展示VAE特性的包含。
    - Python dtype: str
- POSITIVE
    - Comfy dtype: CONDITIONING
    - 产生正面条件上下文，突出强调的期望元素。
    - Python dtype: str
- NEGATIVE
    - Comfy dtype: CONDITIONING
    - 呈现负面条件上下文，详述要排除的元素。
    - Python dtype: str
- LATENT
    - Comfy dtype: LATENT
    - 提供潜在向量上下文，说明使用的潜在空间表示。
    - Python dtype: str
- IMAGE
    - Comfy dtype: IMAGE
    - 提供图像上下文，显示整合的视觉数据。
    - Python dtype: str
- SEED
    - Comfy dtype: INT
    - 返回使用的种子值，确保上下文的可重现性。
    - Python dtype: int
- STEPS
    - Comfy dtype: INT
    - 提供步骤数上下文，定义过程的精细度。
    - Python dtype: int
- STEP_REFINER
    - Comfy dtype: INT
    - 传递步骤细化器上下文，微调操作步骤。
    - Python dtype: int
- CFG
    - Comfy dtype: FLOAT
    - 输出CFG比例上下文，调整条件影响。
    - Python dtype: float
- CKPT_NAME
    - Comfy dtype: COMBO[STRING]
    - 呈现检查点名称上下文，基于特定模型检查点进行定制。
    - Python dtype: str
- SAMPLER
    - Comfy dtype: COMBO[STRING]
    - 提供采样器上下文，定制采样过程。
    - Python dtype: str
- SCHEDULER
    - Comfy dtype: COMBO[STRING]
    - 提供调度器上下文，优化过程流程。
    - Python dtype: str
- CLIP_WIDTH
    - Comfy dtype: INT
    - 返回CLIP宽度上下文，调整输入尺寸。
    - Python dtype: int
- CLIP_HEIGHT
    - Comfy dtype: INT
    - 提供CLIP高度上下文，定制输入大小。
    - Python dtype: int
- TEXT_POS_G
    - Comfy dtype: STRING
    - 传递全局正面文本上下文，用全局正面线索增强。
    - Python dtype: str
- TEXT_POS_L
    - Comfy dtype: STRING
    - 输出局部正面文本上下文，用局部正面线索细化。
    - Python dtype: str
- TEXT_NEG_G
    - Comfy dtype: STRING
    - 呈现全局负面文本上下文，通过排除全局负面元素改善。
    - Python dtype: str
- TEXT_NEG_L
    - Comfy dtype: STRING
    - 提供局部负面文本上下文，通过避免局部负面方面完善。
    - Python dtype: str
- MASK
    - Comfy dtype: MASK
    - 提供掩码上下文，实现定向修改。
    - Python dtype: str
- CONTROL_NET
    - Comfy dtype: CONTROL_NET
    - 返回控制网络上下文，通过额外控制扩展功能。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeBigContext:
  """The Context Big node.

  This context node will expose all context fields as inputs and outputs. It is backwards compatible
  with other context nodes and can be intertwined with them.
  """

  NAME = get_name("Context Big")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name,missing-function-docstring
    return {
      "required": {},
      "optional": ALL_CTX_OPTIONAL_INPUTS,
      "hidden": {},
    }

  RETURN_TYPES = ALL_CTX_RETURN_TYPES
  RETURN_NAMES = ALL_CTX_RETURN_NAMES
  FUNCTION = "convert"

  def convert(self, base_ctx=None, **kwargs):  # pylint: disable = missing-function-docstring
    ctx = new_context(base_ctx, **kwargs)
    return get_context_return_tuple(ctx)

```
