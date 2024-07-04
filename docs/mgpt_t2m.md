
# Documentation
- Class name: mgpt_t2m
- Category: MotionDiff/mGPT
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

mgpt_t2m节点利用MotionGPT模型将文本描述转化为动作数据序列，实现了基于自然语言输入生成动作序列的功能。这种从文本到动作的转换为创意表达和动画制作提供了一种创新的方法。

# Input types
## Required
- mgpt_model
    - MotionGPT模型是该节点的核心组件，用于从文本生成动作序列。它负责解析文本输入并产生相应的动作数据，对整个转换过程至关重要。
    - Comfy dtype: MGPTMODEL
    - Python dtype: torch.nn.Module
- motion_length
    - 指定生成的动作序列的期望长度。这个参数影响动作细节的粒度和整体范围，允许用户控制生成内容的时间跨度。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 随机数生成的种子值，确保在相同输入下生成的动作序列具有可重复性。这对于实验的一致性和结果的可验证性非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 作为创意输入的文本描述，指导动作序列的生成过程。它是将语言概念转化为视觉动作的桥梁，体现了用户的创意意图。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- motion_data
    - 输出的motion_data是根据文本描述生成的动作数据序列，以关节位置随时间变化的形式表示。这些数据可以直接用于动画制作或进一步的动作分析。
    - Comfy dtype: MOTION_DATA
    - Python dtype: Dict[str, np.ndarray]


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
