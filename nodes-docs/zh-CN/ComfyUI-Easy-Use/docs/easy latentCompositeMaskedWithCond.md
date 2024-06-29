# Documentation
- Class name: latentCompositeMaskedWithCond
- Category: EasyUse/Latent
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点整合了将文本输入与潜在表示结合以生成有条件输出的过程。它根据文本条件遮蔽和复合潜在空间，使得能够创造出定制化的结果。

# Input types
## Required
- pipe
    - pipe参数作为节点操作的主要数据和设置源。它对于节点的正常运行至关重要，因为它包含了节点执行任务和生成所需输出所需的必要信息。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- text_combine
    - 该参数保存与潜在数据结合的文本元素列表。它在塑造最终输出中起着重要作用，因为它直接影响调节过程。
    - Comfy dtype: LIST
    - Python dtype: List[str]
- source_latent
    - source_latent参数对于节点的操作至关重要，因为它提供了将被复合和调节的初始潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- source_mask
    - 该参数对于遮蔽过程至关重要，因为它决定了潜在数据的调节方式。它通过控制潜在空间中被修改的区域来影响最终输出。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- destination_mask
    - destination_mask参数在定义将被更新的潜在空间区域方面起着关键作用。它与源遮蔽罩协同工作，以完善最终复合的潜在表示。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- text_combine_mode
    - 该参数决定了文本如何与现有提示结合，影响调节过程和最终输出。它对于控制节点处理文本输入的行为至关重要。
    - Comfy dtype: COMBO[add, replace, cover]
    - Python dtype: str
## Optional
- replace_text
    - replace_text参数允许修改提示中的特定文本。它对于在不改变整个提示结构的况下定制调节过程非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - prompt参数提供了额外的文本上下文，可以用来进一步细化调节过程。它对于为最终输出添加特定的细微差别非常有益。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 该参数包含可利用来增强调节过程的补充图像相关信息。它特别适用于将视觉元素融入最终输出。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Any
- my_unique_id
    - my_unique_id参数用于跟踪和识别节点操作的特定实例。它对于保持过程的完整性和确保准确结果非常重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - pipe输出是输入pipe的更新版本，现在包含最新的样本和修改后的加载器设置。它很重要，因为它代表了流水线的进步和节点处理的整合。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- latent
    - 潜在输出代表复合和调节后的潜在空间。它很关键，因为它是节点操作的直接结果，并作为进一步处理或分析的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- conditioning
    - 调节输出是一组已应用于潜在空间的条件。它对于理解节点如何处理输入以及确保最终输出中存在所需特征非常重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]

# Usage tips
- Infra type: GPU

# Source code
```
class latentCompositeMaskedWithCond:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'text_combine': ('LIST',), 'source_latent': ('LATENT',), 'source_mask': ('MASK',), 'destination_mask': ('MASK',), 'text_combine_mode': (['add', 'replace', 'cover'], {'default': 'add'}), 'replace_text': ('STRING', {'default': ''})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    OUTPUT_IS_LIST = (False, False, True)
    RETURN_TYPES = ('PIPE_LINE', 'LATENT', 'CONDITIONING')
    RETURN_NAMES = ('pipe', 'latent', 'conditioning')
    FUNCTION = 'run'
    OUTPUT_NODE = True
    CATEGORY = 'EasyUse/Latent'

    def run(self, pipe, text_combine, source_latent, source_mask, destination_mask, text_combine_mode, replace_text, prompt=None, extra_pnginfo=None, my_unique_id=None):
        positive = None
        clip = pipe['clip']
        destination_latent = pipe['samples']
        conds = []
        for text in text_combine:
            if text_combine_mode == 'cover':
                positive = text
            elif text_combine_mode == 'replace' and replace_text != '':
                positive = pipe['loader_settings']['positive'].replace(replace_text, text)
            else:
                positive = pipe['loader_settings']['positive'] + ',' + text
            positive_token_normalization = pipe['loader_settings']['positive_token_normalization']
            positive_weight_interpretation = pipe['loader_settings']['positive_weight_interpretation']
            a1111_prompt_style = pipe['loader_settings']['a1111_prompt_style']
            positive_cond = pipe['positive']
            log_node_warn('正在处理提示词编码...')
            steps = pipe['loader_settings']['steps'] if 'steps' in pipe['loader_settings'] else 1
            positive_embeddings_final = advanced_encode(clip, positive, positive_token_normalization, positive_weight_interpretation, w_max=1.0, apply_to_pooled='enable', a1111_prompt_style=a1111_prompt_style, steps=steps)
            (cond_1,) = ConditioningSetMask().append(positive_cond, source_mask, 'default', 1)
            (cond_2,) = ConditioningSetMask().append(positive_embeddings_final, destination_mask, 'default', 1)
            positive_cond = cond_1 + cond_2
            conds.append(positive_cond)
        (samples,) = LatentCompositeMasked().composite(destination_latent, source_latent, 0, 0, False)
        new_pipe = {**pipe, 'samples': samples, 'loader_settings': {**pipe['loader_settings'], 'positive': positive}}
        del pipe
        return (new_pipe, samples, conds)
```