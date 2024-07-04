
# Documentation
- Class name: ELLATextEncode
- Category: ella/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ELLATextEncode节点旨在利用ELLA模型对文本输入进行编码，并通过T5文本嵌入器进行额外的处理。该节点的目标是生成适用于进一步处理或生成任务的条件嵌入，充分利用ELLA和T5模型的能力来增强文本编码过程。

# Input types
## Required
- text
    - 'text'输入是编码的主要文本数据。它在确定输出嵌入方面起着关键作用，作为T5文本嵌入器的直接输入，随后由ELLA模型进行处理。
    - Comfy dtype: STRING
    - Python dtype: str
- sigma
    - 'sigma'参数指定ELLA模型的时间步长，影响编码过程的时间方面。它决定了ELLA模型如何随时间解释条件，从而影响最终的嵌入。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ella
    - 'ella'输入提供了文本编码过程所需的ELLA模型组件，包括ELLA模型本身和T5文本嵌入器。它对于使节点执行其编码功能至关重要。
    - Comfy dtype: ELLA
    - Python dtype: dict

# Output types
- conditioning
    - 输出是一个针对进一步生成任务定制的条件嵌入。它包括来自ELLA模型的嵌入，并增加了额外的信息，如池化输出，旨在增强下游处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: list


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ELLATextEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True}), 
                "sigma": ("FLOAT", {"default": 1}, ),
                "ella": ("ELLA", ),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "ella/conditioning"

    def encode(self, text, ella: dict, sigma):
        ella_dict = ella

        ella: ELLA = ella_dict.get("ELLA")
        t5: T5TextEmbedder = ella_dict.get("T5")

        cond = t5(text)
        cond_ella = ella(cond, timesteps=torch.from_numpy(sigma))
        
        return ([[cond_ella, {"pooled_output": cond_ella}]], ) # Output twice as we don't use pooled output

```
