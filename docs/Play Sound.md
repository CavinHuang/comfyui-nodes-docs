# Documentation
- Class name: Play_Sound_Now
- Category: 😺dzNodes
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_MSSpeech_TTS

Play_Sound_Now节点旨在实现音频文件的即时播放。它通过加载指定的音效文件，并使用单独的线程执行播放，以最小的干扰保证主程序流程。该节点特别适用于需要音频反馈或警报且延迟较小的应用场景。

# Input types
## Required
- path
    - ‘path’参数指定了要播放的音频文件的文件路径。它对节点的操作至关重要，因为它指导节点找到正确的音频文件。没有有效的路径，节点将无法工作，因此这是一个必需的参数。
    - Comfy dtype: STRING
    - Python dtype: str
- volume
    - ‘volume’参数用于调整音频播放的音量。它是一个重要的设置，用于控制音频输出级别，并确保它符合应用的要求。音量可以在0.0到1.0之间设置，其中1.0代表默认的音量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- speed
    - ‘speed’参数改变音频的播放速度。它对于改变声音的节奏而不改变其音高具有重要意义。速度可以在0.1到2.0之间变化，允许播放速度有多种选择。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trigger
    - ‘trigger’参数决定是否启动音频播放。它是一个关键的控制，直接影响节点主要功能的执行。如果设置为True，则播放音频；否则将保持静音。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - Play_Sound_Now节点的‘result’参数不返回任何特定数据，但表示音频播放过程的成功启动。它是任何可能的未来增强或与节点操作相关的状态消息的占位符。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class Play_Sound_Now:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'path': ('STRING', {'default': 'comfyui.mp3'}), 'volume': ('FLOAT', {'default': 1, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'speed': ('FLOAT', {'default': 1, 'min': 0.1, 'max': 2.0, 'step': 0.1}), 'trigger': ('BOOLEAN', {'default': True})}, 'optional': {}}
    RETURN_TYPES = ()
    FUNCTION = 'do_playsound'
    OUTPUT_NODE = True
    CATEGORY = '😺dzNodes'

    def do_playsound(self, path, volume, speed, trigger):
        print(f'# 😺dzNodes: PlaySound: path={path},volume={volume},speed={speed},trigger={trigger}')
        if trigger:
            t = threading.Thread(target=Play(path, volume, speed))
            t.start()
        return {}
```