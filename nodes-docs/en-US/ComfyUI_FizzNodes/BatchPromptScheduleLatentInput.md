---
tags:
- AnimationScheduling
- PromptScheduling
- Scheduling
---

# Batch Prompt Schedule (Latent Input) 📅🅕🅝
## Documentation
- Class name: `BatchPromptScheduleLatentInput`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

This node is designed to process animation prompts for batch scheduling with latent inputs. It sequences the user's formatted prompt into current and next prompts along with conditioning strength, evaluates expressions within these prompts, and applies a scheduling algorithm to generate a batch of conditionings tailored to the input latent values. The node's functionality emphasizes the dynamic adaptation of text-based animation prompts to the temporal dimension of animations, facilitating the creation of nuanced and temporally coherent animated sequences.
## Input types
### Required
- **`text`**
    - This parameter represents the primary text prompt for the animation, serving as the foundational content from which positive and negative prompts are derived.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - This parameter is essential for the animation process, providing the clip information required for generating the animation.
    - Comfy dtype: `CLIP`
    - Python dtype: `Any`
- **`num_latents`**
    - Represents the number of latent inputs that influence the animation generation process, providing a basis for dynamic adaptation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`print_output`**
    - A boolean parameter that controls whether the output of the animation process is printed, aiding in debugging and process visualization.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`pre_text`**
    - Pre-text is added before the main text prompt to modify or guide the animation's thematic direction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`app_text`**
    - Appended text that follows the main text prompt, further tailoring the animation's narrative or aesthetic.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_frame`**
    - Specifies the starting frame for the animation, setting the initial point for prompt scheduling and animation generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`pw_a`**
    - A floating-point parameter that influences the weighting of animation prompts, contributing to the scheduling algorithm's complexity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_b`**
    - Similar to pw_a, this floating-point parameter further adjusts the prompt weighting, allowing for nuanced control over the animation's development.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_c`**
    - This parameter works alongside pw_a and pw_b to refine the weighting and scheduling of animation prompts, enhancing the final output's dynamic range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pw_d`**
    - Completes the set of weight parameters (pw_a, pw_b, pw_c), pw_d offers additional fine-tuning of the prompt scheduling process for the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`POS`**
    - Comfy dtype: `CONDITIONING`
    - This output represents the positive conditioning generated for the animation, based on the scheduled prompts.
    - Python dtype: `torch.Tensor`
- **`NEG`**
    - Comfy dtype: `CONDITIONING`
    - This output denotes the negative conditioning generated for the animation, contrasting with the positive to add depth and complexity.
    - Python dtype: `torch.Tensor`
- **`INPUT_LATENTS`**
    - Comfy dtype: `LATENT`
    - This output returns the input latents, potentially modified or directly passed through the scheduling process.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ConditioningCombine](../../Comfy/Nodes/ConditioningCombine.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)



## Source code
```python
class BatchPromptScheduleLatentInput:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text": ("STRING", {"multiline": True, "default": defaultPrompt}),
                    "clip": ("CLIP",),
                    "num_latents": ("LATENT", ),
                    "print_output":("BOOLEAN", {"default": False, "forceInput": True}),
                },
                "optional": {"pre_text": ("STRING", {"multiline": True, "forceInput": True}),
                    "app_text": ("STRING", {"multiline": True, "forceInput": True}),
                    "start_frame": ("INT", {"default": 0.0, "min": 0, "max": 9999, "step": 1, }),
                    "pw_a": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_b": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_c": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                    "pw_d": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.1, "forceInput": True }),
                }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT",) #"CONDITIONING", "CONDITIONING", "CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("POS", "NEG", "INPUT_LATENTS", ) #"POS_CUR", "NEG_CUR", "POS_NXT", "NEG_NXT",)
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, text, num_latents, print_output, clip, start_frame, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text=''
    ):
        settings = ScheduleSettings(
            text_g=text,
            pre_text_G=pre_text,
            app_text_G=app_text,
            text_L=None,
            pre_text_L=None,
            app_text_L=None,
            max_frames=sum(tensor.size(0) for tensor in num_latents.values()),
            current_frame=None,
            print_output=print_output,
            pw_a=pw_a,
            pw_b=pw_b,
            pw_c=pw_c,
            pw_d=pw_d,
            start_frame=start_frame,
            width=None,
            height=None,
            crop_w=None,
            crop_h=None,
            target_width=None,
            target_height=None,
        )
        return batch_prompt_schedule_latentInput(settings,clip, num_latents)

```
