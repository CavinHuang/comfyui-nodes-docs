---
tags:
- AnimationScheduling
- Frame
- Keyframe
---

# Latent Keyframe Group 🛂🅐🅒🅝
## Documentation
- Class name: `LatentKeyframeGroup`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/keyframes`
- Output node: `False`

The LatentKeyframeGroup node is designed to manage and manipulate groups of latent keyframes, facilitating the creation, cloning, and integration of keyframe data. It serves as a foundational component in advanced control networks, enabling dynamic adjustments and enhancements to generated content through keyframe manipulation.
## Input types
### Required
- **`index_strengths`**
    - A string representing index-strength pairs used to create new latent keyframes. This allows for precise control over the creation of keyframes based on specified strengths.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`prev_latent_kf`**
    - Represents the previous group of latent keyframes to be cloned and integrated with new keyframe data. It is crucial for maintaining continuity and building upon existing keyframe configurations.
    - Comfy dtype: `LATENT_KEYFRAME`
    - Python dtype: `LatentKeyframeGroup`
- **`latent_optional`**
    - An optional parameter that, when provided, influences the generation of latent keyframes based on additional latent image data.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[Latent]`
- **`print_keyframes`**
    - A flag indicating whether to log information about each keyframe, including its batch index and strength, for debugging or informational purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`LATENT_KF`**
    - Comfy dtype: `LATENT_KEYFRAME`
    - The resulting group of latent keyframes, including both newly created and previously existing keyframes, ready for further manipulation or application.
    - Python dtype: `LatentKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentKeyframeGroupNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "index_strengths": ("STRING", {"multiline": True, "default": ""}),
            },
            "optional": {
                "prev_latent_kf": ("LATENT_KEYFRAME", ),
                "latent_optional": ("LATENT", ),
                "print_keyframes": ("BOOLEAN", {"default": False})
            }
        }
    
    RETURN_NAMES = ("LATENT_KF", )
    RETURN_TYPES = ("LATENT_KEYFRAME", )
    FUNCTION = "load_keyframes"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/keyframes"

    def validate_index(self, index: int, latent_count: int = 0, is_range: bool = False, allow_negative = False) -> int:
        # if part of range, do nothing
        if is_range:
            return index
        # otherwise, validate index
        # validate not out of range - only when latent_count is passed in
        if latent_count > 0 and index > latent_count-1:
            raise IndexError(f"Index '{index}' out of range for the total {latent_count} latents.")
        # if negative, validate not out of range
        if index < 0:
            if not allow_negative:
                raise IndexError(f"Negative indeces not allowed, but was {index}.")
            conv_index = latent_count+index
            if conv_index < 0:
                raise IndexError(f"Index '{index}', converted to '{conv_index}' out of range for the total {latent_count} latents.")
            index = conv_index
        return index

    def convert_to_index_int(self, raw_index: str, latent_count: int = 0, is_range: bool = False, allow_negative = False) -> int:
        try:
            return self.validate_index(int(raw_index), latent_count=latent_count, is_range=is_range, allow_negative=allow_negative)
        except ValueError as e:
            raise ValueError(f"index '{raw_index}' must be an integer.", e)

    def convert_to_latent_keyframes(self, latent_indeces: str, latent_count: int) -> set[LatentKeyframe]:
        if not latent_indeces:
            return set()
        int_latent_indeces = [i for i in range(0, latent_count)]
        allow_negative = latent_count > 0
        chosen_indeces = set()
        # parse string - allow positive ints, negative ints, and ranges separated by ':'
        groups = latent_indeces.split(",")
        groups = [g.strip() for g in groups]
        for g in groups:
            # parse strengths - default to 1.0 if no strength given
            strength = 1.0
            if '=' in g:
                g, strength_str = g.split("=", 1)
                g = g.strip()
                try:
                    strength = float(strength_str.strip())
                except ValueError as e:
                    raise ValueError(f"strength '{strength_str}' must be a float.", e)
                if strength < 0:
                    raise ValueError(f"Strength '{strength}' cannot be negative.")
            # parse range of indeces (e.g. 2:16)
            if ':' in g:
                index_range = g.split(":", 1)
                index_range = [r.strip() for r in index_range]
                start_index = self.convert_to_index_int(index_range[0], latent_count=latent_count, is_range=True, allow_negative=allow_negative)
                end_index = self.convert_to_index_int(index_range[1], latent_count=latent_count, is_range=True, allow_negative=allow_negative)
                # if latents were passed in, base indeces on known latent count
                if len(int_latent_indeces) > 0:
                    for i in int_latent_indeces[start_index:end_index]:
                        chosen_indeces.add(LatentKeyframe(i, strength))
                # otherwise, assume indeces are valid
                else:
                    for i in range(start_index, end_index):
                        chosen_indeces.add(LatentKeyframe(i, strength))
            # parse individual indeces
            else:
                chosen_indeces.add(LatentKeyframe(self.convert_to_index_int(g, latent_count=latent_count, allow_negative=allow_negative), strength))
        return chosen_indeces

    def load_keyframes(self,
                       index_strengths: str,
                       prev_latent_kf: LatentKeyframeGroup=None,
                       prev_latent_keyframe: LatentKeyframeGroup=None, # old name
                       latent_image_opt=None,
                       print_keyframes=False):
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        curr_latent_keyframe = LatentKeyframeGroup()

        latent_count = -1
        if latent_image_opt:
            latent_count = latent_image_opt['samples'].size()[0]
        latent_keyframes = self.convert_to_latent_keyframes(index_strengths, latent_count=latent_count)

        for latent_keyframe in latent_keyframes:
            curr_latent_keyframe.add(latent_keyframe)
        
        if print_keyframes:
            for keyframe in curr_latent_keyframe.keyframes:
                logger.info(f"keyframe {keyframe.batch_index}:{keyframe.strength}")

        # replace values with prev_latent_keyframes
        for latent_keyframe in prev_latent_keyframe.keyframes:
            curr_latent_keyframe.add(latent_keyframe)

        return (curr_latent_keyframe,)

```
