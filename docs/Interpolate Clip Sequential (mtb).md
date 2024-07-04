
# Documentation
- Class name: Interpolate Clip Sequential (mtb)
- Category: mtb/conditioning
- Output node: False

Interpolate Clip Sequential (mtb)节点用于在给定的基础文本中进行文本编码的序列插值，使用指定的替换内容和插值强度参数。它旨在通过插值新的文本编码来修改基础文本，从而实现原始文本内容和新文本内容之间的无缝过渡。

# Input types
## Required
- base_text
    - 作为插值起点的原始文本内容。这是整个插值过程的基础，为后续的文本修改提供了初始状态。
    - Comfy dtype: STRING
    - Python dtype: str
- text_to_replace
    - 基础文本中需要通过插值进行替换的特定部分。这个参数指定了插值操作的目标区域，决定了哪些文本内容将被新的编码所影响。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 一个影响原始文本修改程度的参数，用于控制原始文本编码和新文本编码之间的混合比例。它决定了最终结果中保留原始文本特征的程度。
    - Comfy dtype: CLIP
    - Python dtype: float
- interpolation_strength
    - 定义插值效果的强度，调整新文本编码融入基础文本的显著程度。这个参数直接影响插值的效果，决定了新旧文本编码的混合比例。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 插值过程的结果，以conditioning对象的形式呈现，其中包含了混合后的文本编码。这个输出可以用于后续的文本生成或处理任务。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_InterpolateClipSequential:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "base_text": ("STRING", {"multiline": True}),
                "text_to_replace": ("STRING", {"default": ""}),
                "clip": ("CLIP",),
                "interpolation_strength": (
                    "FLOAT",
                    {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01},
                ),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "interpolate_encodings_sequential"

    CATEGORY = "mtb/conditioning"

    def interpolate_encodings_sequential(
        self,
        base_text,
        text_to_replace,
        clip,
        interpolation_strength,
        **replacements,
    ):
        log.debug(f"Received interpolation_strength: {interpolation_strength}")

        # - Ensure interpolation strength is within [0, 1]
        interpolation_strength = max(0.0, min(1.0, interpolation_strength))

        # - Check if replacements were provided
        if not replacements:
            raise ValueError("At least one replacement should be provided.")

        num_replacements = len(replacements)
        log.debug(f"Number of replacements: {num_replacements}")

        segment_length = 1.0 / num_replacements
        log.debug(f"Calculated segment_length: {segment_length}")

        # - Find the segment that the interpolation_strength falls into
        segment_index = min(
            int(interpolation_strength // segment_length), num_replacements - 1
        )
        log.debug(f"Segment index: {segment_index}")

        # - Calculate the local strength within the segment
        local_strength = (
            interpolation_strength - (segment_index * segment_length)
        ) / segment_length
        log.debug(f"Local strength: {local_strength}")

        # - If it's the first segment, interpolate between base_text and the first replacement
        if segment_index == 0:
            replacement_text = list(replacements.values())[0]
            log.debug("Using the base text a the base blend")
            # -  Start with the base_text condition
            tokens = clip.tokenize(base_text)
            cond_from, pooled_from = clip.encode_from_tokens(
                tokens, return_pooled=True
            )
        else:
            base_replace = list(replacements.values())[segment_index - 1]
            log.debug(f"Using {base_replace} a the base blend")

            # - Start with the base_text condition replaced by the closest replacement
            tokens = clip.tokenize(
                base_text.replace(text_to_replace, base_replace)
            )
            cond_from, pooled_from = clip.encode_from_tokens(
                tokens, return_pooled=True
            )

            replacement_text = list(replacements.values())[segment_index]

        interpolated_text = base_text.replace(
            text_to_replace, replacement_text
        )
        tokens = clip.tokenize(interpolated_text)
        cond_to, pooled_to = clip.encode_from_tokens(
            tokens, return_pooled=True
        )

        # - Linearly interpolate between the two conditions
        interpolated_condition = (
            1.0 - local_strength
        ) * cond_from + local_strength * cond_to
        interpolated_pooled = (
            1.0 - local_strength
        ) * pooled_from + local_strength * pooled_to

        return (
            [[interpolated_condition, {"pooled_output": interpolated_pooled}]],
        )

```
