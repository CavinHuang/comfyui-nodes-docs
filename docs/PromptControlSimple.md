# Documentation
- Class name: PromptControlSimple
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

此类节点封装了管理和应用提示计划以及对模型进行过滤的功能，从而控制生成过程。它抽象了提示操作的复杂性，并提供了一种结构化的方法，根据指定条件细化模型的输出。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将处理输入并生成输出的AI系统。它是驱动节点整个操作的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数对于管理输入数据的上下文和结构至关重要，确保模型在期望的框架内处理信息。
    - Comfy dtype: CLIP
    - Python dtype: ClipModel
- positive
    - 正面输入作为肯定性提示，引导模型的生成朝着期望的结果发展，塑造输出的方向。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面输入作为约束，防止模型生成不希望的内容，并确保输出与指定的边界一致。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- tags
    - 标签用于对生成的内容进行分类和过滤，允许对输出的特定方面进行有针对性的控制。
    - Comfy dtype: STRING
    - Python dtype: str
- start
    - 开始参数定义了提示计划中的起始点，决定了提示的影响何时开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - 结束参数标记了提示计划中的终点，建立了提示的影响何时结束。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是更新后的AI系统，它结合了应用的提示和过滤器，准备生成符合指定指南的内容。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正面输出代表了经过处理并现在成为模型指导系统一部分的精炼提示。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- negative
    - 负面输出包括已应用的约束，确保生成的内容遵守定义的限制。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- model_filtered
    - 过滤后的模型输出是已根据指定的标签和百分比范围进行调整的AI系统，微调其生成能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- pos_filtered
    - 正面过滤输出表示根据标签和百分比范围过滤的提示，使模型的生成集中在期望的元素上。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]
- neg_filtered
    - 负面过滤输出表示通过标签和百分比范围过滤而精炼的约束，提高了模型避免不希望的内容的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]

# Usage tips
- Infra type: CPU

# Source code
```
class PromptControlSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'positive': ('STRING', {'multiline': True}), 'negative': ('STRING', {'multiline': True})}, 'optional': {'tags': ('STRING', {'default': ''}), 'start': ('FLOAT', {'min': 0.0, 'max': 1.0, 'step': 0.1, 'default': 0.0}), 'end': ('FLOAT', {'min': 0.0, 'max': 1.0, 'step': 0.1, 'default': 1.0})}}
    RETURN_TYPES = ('MODEL', 'CONDITIONING', 'CONDITIONING', 'MODEL', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('model', 'positive', 'negative', 'model_filtered', 'pos_filtered', 'neg_filtered')
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, model, clip, positive, negative, tags='', start=0.0, end=1.0):
        lora_cache = {}
        cond_cache = {}
        pos_sched = parse_prompt_schedules(positive)
        pos_cond = pos_filtered = control_to_clip_common(self, clip, pos_sched, lora_cache, cond_cache)
        neg_sched = parse_prompt_schedules(negative)
        neg_cond = neg_filtered = control_to_clip_common(self, clip, neg_sched, lora_cache, cond_cache)
        new_model = model_filtered = schedule_lora_common(model, pos_sched, lora_cache)
        if [tags.strip(), start, end] != ['', 0.0, 1.0]:
            pos_filtered = control_to_clip_common(self, clip, pos_sched.with_filters(tags, start, end), lora_cache, cond_cache)
            neg_filtered = control_to_clip_common(self, clip, neg_sched.with_filters(tags, start, end), lora_cache, cond_cache)
            model_filtered = schedule_lora_common(model, pos_sched.with_filters(tags, start, end), lora_cache)
        return (new_model, pos_cond, neg_cond, model_filtered, pos_filtered, neg_filtered)
```