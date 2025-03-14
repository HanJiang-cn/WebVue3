<script lang="ts" setup>
import TeamUp from "@/components/TeamMain/TeamUp.vue"
import TeamEditor from "@/components/TeamMain/TeamEditor.vue"
const add = () => {
    console.log("add") 
}
</script>
<template>
<div class="box">
 <div class="style"></div><div class="title">队伍管理 </div>
  <div class="box2">
   <div class="add">
       <el-button type="primary" @click="add">添加成员</el-button>
   </div>
   <div class="people">
        <div class="main">
            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span>许致豪</span>
                    </div>
                </template>
                <div class="content-wrapper">
                    <div class="head_img">
            <TeamUp></TeamUp>
                    </div>
                    <div class="info-container">
                        <div class="info-item">
              <span class="label">姓名：</span>
              <span class="value">许致豪</span>
                        </div>
          
                        <div class="info-item">
              <span class="label">职位：</span>
              <span class="value">队长</span>
                        </div>
                    <div class="info-item">
                        <span class="label">联系方式：</span>
                        <span class="value">138-0013-8000</span>
                    </div>
                    </div>
                </div>
                <template #footer>
                    <TeamEditor></TeamEditor>&nbsp;
           
                    <el-button plain>删除</el-button>
                </template>
            </el-card>
        </div>
   </div>
  </div>
</div>
</template>
<style lang="less" scoped>
.box {
    width: 90%;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 20px 0;

    .title {
        font-size: 24px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 1.5rem;
        padding-left: 8px;
        border-left: 4px solid #409EFF;
    }

    .box2 {
        background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(64, 158, 255, 0.1);
        transition: all 0.3s ease;

        .add {
            margin-bottom: 2rem;
            text-align: left;

            .el-button {
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 500;
                transition: all 0.2s ease;

                &:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
                }
            }
        }

        .people {
            .main {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;

                .el-card {
                    width: 100%;
                    border-radius: 12px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(64, 158, 255, 0.15);
                    :deep(.el-card__header) {
                        padding: 16px 20px;
                        background: rgba(64, 158, 255, 0.05);
                        border-bottom: 1px solid rgba(64, 158, 255, 0.1);

                        .card-header {
                            font-size: 18px;
                            font-weight: 600;
                            color: #2c3e50;
                        }
                    }

                    .content-wrapper {
                        display: flex;
                        padding: 16px 0;
                        gap: 20px;

                        .head_img {
                            flex: 0 0 80px;
                            height: 80px;
                            border-radius: 8px;
                            overflow: hidden;
                            background: #f0f4f9;
                        }

                        .info-container {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            gap: 12px;

                            .info-item {
                                display: flex;
                                align-items: center;
                                font-size: 14px;

                                .label {
                                    flex: 0 0 80px;
                                    color: #7a8ba9;
                                    font-weight: 500;
                                }

                                .value {
                                    color: #2c3e50;
                                    font-weight: 600;
                                }
                            }
                        }
                    }

                    :deep(.el-card__footer) {
                        display: flex;
                        justify-content: flex-end;
                        gap: 8px;
                        padding: 16px 20px;
                        border-top: 1px solid rgba(64, 158, 255, 0.1);

                        .el-button {
                            padding: 8px 16px;
                            border-radius: 6px;
                            transition: all 0.2s ease;

                            &:hover {
                                transform: translateY(-1px);
                            }

                            &.is-plain {
                                &:hover {
                                    color: #ff4d4f;
                                    border-color: #ff4d4f;
                                    background: rgba(255, 77, 79, 0.05);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// 响应式调整
@media (max-width: 768px) {
    .box {
        width: 95%;
        padding: 10px 0;

        .box2 {
            padding: 1.5rem;

            .people .main {
                grid-template-columns: 1fr;
            }
        }
    }
}

@media (max-width: 480px) {
    .content-wrapper {
        flex-direction: column;
        align-items: center;
        text-align: center;

        .info-container .info-item {
            flex-direction: column;
            gap: 4px;
        }
    }
}
</style>