
# Documentation
- Class name: InstanceDiffusionTrackingPrompt
- Category: instance/conditioning
- Output node: False

InstanceDiffusionTrackingPrompt节点旨在将基于文本的提示与实例跟踪信息相结合，以便为实例扩散模型生成条件输入。它提取并编码与特定实例或类别相关的提示，将这些提示与空间跟踪数据结合，并为实例扩散机制的进一步处理做好准备。

# Input types
## Required
- positive
    - 'positive'参数代表正面实例的初始条件数据，作为应用基于文本条件的基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- negative
    - 与'positive'类似，'negative'参数保存负面实例的初始条件数据，这些数据将被基于文本的条件增强。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- clip
    - 'clip'参数是一个用于将文本提示编码为嵌入的模型，在解释文本信息方面起着至关重要的作用。
    - Comfy dtype: CLIP
    - Python dtype: object
- tracking
    - 此参数包含实例的空间跟踪信息，对于将文本提示与其相应的空间位置对齐至关重要。
    - Comfy dtype: TRACKING
    - Python dtype: dict
- positionnet
    - PositionNet是一个模型，与fusers结合使用，用于细化实例的空间信息以获得更好的条件设置。
    - Comfy dtype: POSITIONNET
    - Python dtype: object
- fusers
    - Fusers是整合多个信息源（如嵌入和空间数据）的机制，用于增强条件设置过程。
    - Comfy dtype: FUSERS
    - Python dtype: object
- positive_text
    - 一个多行字符串，包含与正面实例相关的文本提示，这些提示将被处理和编码。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_text
    - 一个多行字符串，包含与负面实例相关的文本提示，将以与positive_text类似的方式进行处理和编码。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 输出是正面实例的条件数据，现在已经融合了基于文本的提示和空间跟踪信息，可以在实例扩散模型中进行进一步处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- negative
    - 类似地，这个输出是负面实例的条件数据，也融合了基于文本的提示和空间跟踪信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstanceDiffusionTrackingPromptNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"positive": ("CONDITIONING", ),
                             "negative": ("CONDITIONING", ),
                             "clip": ("CLIP", ),
                             "tracking": ("TRACKING", ),
                             "positionnet": ("POSITIONNET", ),
                             "fusers": ("FUSERS", ),
                             "positive_text": ("STRING", {"multiline": True}),
                             "negative_text": ("STRING", {"multiline": True}),
                             }}
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "append"

    CATEGORY = "instance/conditioning"

    def _get_position_conds(self, clip, tracking, text):
        # Get prompts and their class id and trakcer id
        prompt_pairs = extract_prompts(text)

        # Go through prompt pairs, encode prompts, and join with positions from tracking
        position_conds = []
        for tracker_id, class_id, prompt in prompt_pairs:
            _, cond_pooled = clip.encode_from_tokens(
                clip.tokenize(prompt), return_pooled=True)
            # A tracker_id of -1 means that it is prompting all instances of a single class
            if tracker_id != -1:
                position_cond = {'cond_pooled': cond_pooled, 'positions':
                                 tracking[class_id][tracker_id]}
                position_conds.append(position_cond)
            else:
                for tracker_id in tracking[class_id]:
                    position_cond = {'cond_pooled': cond_pooled,
                                     'positions': tracking[class_id][tracker_id]}
                    position_conds.append(position_cond)

        return position_conds

    def _apply_position_conds(self, position_conds, conditioning, fusers, positionnet):
        # Add prompts+embeddings to the input conditionings
        cond_out = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            cond = n[1]
            prev = []
            has_instance = 'instance_diffusion' in cond
            instance_conditioning = conditioning['instance_diffusion'] if has_instance else InstanceConditioning(
                fusers, positionnet)
            cond['instance_diffusion'] = instance_conditioning
            instance_conditioning.add_conds(position_conds)

            cond['gligen'] = ('position', instance_conditioning, None)

            cond_out.append(n)

        return cond_out

    def append(self, positive, negative, clip, tracking, fusers, positionnet, positive_text, negative_text, fusers_batch_size=None):

        positive_positions = self._get_position_conds(
            clip, tracking, positive_text)
        positive = self._apply_position_conds(
            positive_positions, positive, fusers, positionnet)

        negative_positions = self._get_position_conds(
            clip, tracking, negative_text)
        negative = self._apply_position_conds(
            negative_positions, negative, fusers, positionnet)

        return (positive, negative)

```
