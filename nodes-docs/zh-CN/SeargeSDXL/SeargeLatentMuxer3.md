# Documentation
- Class name: SeargeLatentMuxer3
- Category: Searge/_deprecated_/FlowControl
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeLatentMuxer3 是一个用于管理潜在数据流的节点，它通过选择三个提供的潜在输入中的一个来控制数据流向，这取决于输入选择器的值。此节点在需要条件路由的复杂网络中控制数据流向至关重要。

# Input types
## Required
- input0
    - 第一个潜在输入，节点可以选择并将其路由到输出。当输入选择器没有指示其他输入时，它在节点的决策过程中起着关键作用。
    - Comfy dtype: "LATENT"
    - Python dtype: np.ndarray or a similar array type representing latent data
- input1
    - 节点的第二个潜在输入选项。当输入选择器设置为1时，它成为输出，相应地指导数据流。
    - Comfy dtype: "LATENT"
    - Python dtype: np.ndarray or a similar array type representing latent data
- input2
    - 可以由节点选择的第三个潜在输入。当输入选择器的值为2时，它被选为输出，从而确定数据流路径。
    - Comfy dtype: "LATENT"
    - Python dtype: np.ndarray or a similar array type representing latent data
- input_selector
    - 这个整数参数决定选择哪个潜在输入作为输出。它在节点的操作中至关重要，因为它直接影响路由决策。
    - Comfy dtype: "INT"
    - Python dtype: int

# Output types
- output
    - 节点的输出是基于输入选择器的值选择的潜在输入。这个输出携带着将通过网络继续传输的数据。
    - Comfy dtype: "LATENT"
    - Python dtype: np.ndarray or a similar array type representing the selected latent data

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeLatentMuxer3:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input0': ('LATENT',), 'input1': ('LATENT',), 'input2': ('LATENT',), 'input_selector': ('INT', {'default': 0, 'min': 0, 'max': 2})}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('output',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/FlowControl'

    def mux(self, input0, input1, input2, input_selector):
        if input_selector == 1:
            return (input1,)
        elif input_selector == 2:
            return (input2,)
        else:
            return (input0,)
```