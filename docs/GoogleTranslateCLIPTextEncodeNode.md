
# Documentation
- Class name: GoogleTranslateCLIPTextEncodeNode
- Category: AlekPet Nodes/conditioning
- Output node: False

这个节点集成了文本翻译和CLIP文本编码功能，允许将输入文本从一种语言翻译成另一种语言，然后使用CLIP模型对翻译后的文本进行编码，以便进行进一步处理或分析。

# Input types
## Required
- from_translate
    - 指定翻译的源语言，可以选择自动检测或从预定义的语言列表中选择。这影响了输入文本翻译的初始步骤。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Union[str, List[str]]
- to_translate
    - 定义输入文本翻译的目标语言，影响文本将被翻译成的语言。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- manual_translate
    - 一个布尔标志，用于确定是否应自动执行翻译或手动跳过，影响翻译过程。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- text
    - 要翻译和编码的输入文本，作为处理的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 用于编码翻译后文本的CLIP模型，促进从文本生成嵌入或特征。
    - Comfy dtype: CLIP
    - Python dtype: CLIP

# Output types
- conditioning
    - 提供从CLIP模型对翻译文本的编码中得到的条件信息，对下游任务有用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- string
    - 翻译后的文本，表示编码前翻译过程的输出。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
