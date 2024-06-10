---
tags:
- MotionData
---

# MotionGPT Text2Motion
## Documentation
- Class name: `mgpt_t2m`
- Category: `MotionDiff/mGPT`
- Output node: `False`

The node transforms textual descriptions into motion data sequences using a MotionGPT model, enabling the generation of motion sequences based on natural language inputs.
## Input types
### Required
- **`mgpt_model`**
    - The MotionGPT model used for generating motion sequences from text. It's crucial for interpreting the textual input and producing corresponding motion data.
    - Comfy dtype: `MGPTMODEL`
    - Python dtype: `torch.nn.Module`
- **`motion_length`**
    - Specifies the desired length of the generated motion sequence. It influences the granularity and extent of the motion details.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed for random number generation, ensuring reproducibility of the motion sequences generated from the same inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The textual description that guides the generation of the motion sequence, serving as the creative input for the motion synthesis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`motion_data`**
    - Comfy dtype: `MOTION_DATA`
    - The generated motion data sequence, represented as joint positions over time, derived from the textual description.
    - Python dtype: `Dict[str, np.ndarray]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class mgpt_t2m:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "mgpt_model": ("MGPTMODEL",),
            "motion_length": ("INT", {"default": 196, "min": 1, "max": 196, "step": 1}),
            "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "text": ("STRING", {"multiline": True,"default": "make the person jump and turn around"}),
            }
        }

    RETURN_TYPES = ("MOTION_DATA",)
    RETURN_NAMES = ("motion_data", )
    FUNCTION = "process"
    CATEGORY = "MotionDiff/mGPT"

    def process(self, seed, text, mgpt_model, motion_length):
        device = get_torch_device()
        torch.manual_seed(seed)

        prompt = mgpt_model.lm.placeholder_fulfill(text, motion_length, "", "")
        batch = {
            "length": [motion_length], #I don"t know what this is supposed to do if anything? Lenght seems to be determined by the prompt up to the max of 196
            "text": [prompt],
        }
        mgpt_model.to(device)
        outputs = mgpt_model(batch, task="t2m")
        #out_feats = outputs["feats"][0]
        #print("out_feats_shape: ",out_feats.shape)
        out_lengths = outputs["length"][0]
        #print("out_lengths: ",out_lengths)
        out_joints = outputs["joints"][:out_lengths].detach().cpu().numpy()
        mgpt_model.cpu()
        return ({"joints": out_joints.squeeze(0)},)

```
