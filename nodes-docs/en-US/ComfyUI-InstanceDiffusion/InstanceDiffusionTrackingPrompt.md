# Instance Diffusion Tracking Prompt
## Documentation
- Class name: `InstanceDiffusionTrackingPrompt`
- Category: `instance/conditioning`
- Output node: `False`

The InstanceDiffusionTrackingPrompt node is designed to integrate text-based prompts with instance tracking information, facilitating the generation of conditioned inputs for instance diffusion models. It extracts and encodes prompts related to specific instances or classes, combines these with spatial tracking data, and prepares them for further processing by instance diffusion mechanisms.
## Input types
### Required
- **`positive`**
    - The 'positive' parameter represents the initial conditioning data for positive instances, serving as a foundation for applying text-based conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
- **`negative`**
    - Similar to 'positive', the 'negative' parameter holds the initial conditioning data for negative instances, which will be augmented with text-based conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
- **`clip`**
    - The 'clip' parameter is a model used for encoding text prompts into embeddings, playing a crucial role in interpreting the textual information.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`tracking`**
    - This parameter contains spatial tracking information for instances, crucial for aligning text prompts with their corresponding spatial locations.
    - Comfy dtype: `TRACKING`
    - Python dtype: `dict`
- **`positionnet`**
    - PositionNet is a model that, combined with fusers, is used to refine the spatial information of instances for better conditioning.
    - Comfy dtype: `POSITIONNET`
    - Python dtype: `object`
- **`fusers`**
    - Fusers are mechanisms that integrate multiple sources of information, such as embeddings and spatial data, to enhance the conditioning process.
    - Comfy dtype: `FUSERS`
    - Python dtype: `object`
- **`positive_text`**
    - A multiline string containing text prompts related to positive instances, which will be processed and encoded.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_text`**
    - A multiline string containing text prompts for negative instances, to be processed and encoded similarly to positive_text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The output is conditioned data for positive instances, now enriched with text-based prompts and spatial tracking information, ready for further processing in instance diffusion models.
    - Python dtype: `list`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Similarly, this output is conditioned data for negative instances, enriched with text-based prompts and spatial tracking information.
    - Python dtype: `list`
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
