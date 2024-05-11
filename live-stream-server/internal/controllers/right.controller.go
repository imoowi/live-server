/*
generated by comer,https://github.com/imoowi/comer
Copyright © 2023 jun<simpleyuan@gmail.com>
*/
package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/imoowi/comer/interfaces"
	"github.com/imoowi/comer/utils/response"
	"github.com/imoowi/live-stream-server/internal/models"
	"github.com/imoowi/live-stream-server/internal/services"
	"net/http"
	"gorm.io/gorm"
	"github.com/spf13/cast"
)

//	@Summary	分页列表(pagelist)
//	@Tags		right
//	@Accept		application/json
//	@Produce	application/json
//	@Param		Authorization	header		string								true	"Bearer 用户令牌"
//	@Param		{object}		query		models.RightFilter					false	"query参数"
//	@Success	200				{object}	response.PageListT[models.Right]	"成功"
//	@Failure	400				"请求错误"
//	@Failure	401				"token验证失败"
//	@Failure	500				"内部错误"
//	@Router		/api/rights [get]
func RightPageList(c *gin.Context) {
	var filter interfaces.IFilter = &models.RightFilter{}
	err := c.ShouldBindQuery(&filter)
	if err != nil {
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	
	if 0 >= filter.GetPage(){ //如果不传Page，默认为1
		filter.SetPage(1)
	}
	if 0 >= filter.GetPageSize(){ //如果不传PageSize，默认取20条
		filter.SetPageSize(20)
	}
	if filter.GetPageSize() > 1000 {
		response.Error(`每一页不能超过1000条记录`, http.StatusBadRequest,c)
		return
	}
	result, err := services.Right.PageList(c, &filter)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Error(err.Error(), http.StatusNotFound,c)
			return
		}
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	response.OK(result,c)
}

//	@Summary	详情(one)
//	@Tags		right
//	@Accept		application/json
//	@Produce	application/json
//	@Param		Authorization	header		string			true	"Bearer 用户令牌"
//	@Param		id				path		int				true	"id"
//	@Success	200				{object}	models.Right	"成功"
//	@Failure	400				"请求错误"
//	@Failure	401				"token验证失败"
//	@Failure	500				"内部错误"
//	@Router		/api/rights/{id} [get]
func RightOne(c *gin.Context) {
	id := c.Param(`id`)
	if id == `` {
		response.Error(`pls input id`, http.StatusBadRequest,c)
		return
	}

	one, err := services.Right.One(c, cast.ToUint(id))
	if err != nil {
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	response.OK(one,c)
}

//	@Summary	新增(add)
//	@Tags		right
//	@Accept		application/json
//	@Produce	application/json
//	@Param		Authorization	header	string			true	"Bearer 用户令牌"
//	@Param		{object}		body	models.Right	true	"body"
//	@Success	200
//	@Failure	400	"请求错误"
//	@Failure	401	"token验证失败"
//	@Failure	500	"内部错误"
//	@Router		/api/rights [post]
func RightAdd(c *gin.Context) {
	model := &models.Right{}
	err := c.ShouldBindBodyWith(&model,binding.JSON)
	if err != nil {
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	newId, err := services.Right.Add(c,  model)
	if err != nil {
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	response.OK(newId,c)
}

//	@Summary	更新(update)
//	@Tags		right
//	@Accept		application/json
//	@Produce	application/json
//	@Param		Authorization	header	string			true	"Bearer 用户令牌"
//	@Param		id				path	int				true	"id"
//	@Param		{object}		body	models.Right	true	"body"
//	@Success	200
//	@Failure	400	"请求错误"
//	@Failure	401	"token验证失败"
//	@Failure	500	"内部错误"
//	@Router		/api/rights/{id} [put]
func RightUpdate(c *gin.Context) {
	id := c.Param(`id`)
	if id == `` {
		response.Error(`pls input id`, http.StatusBadRequest,c)
		return
	}
	model := make(map[string]any)
	err := c.ShouldBindBodyWith(&model,binding.JSON)
	if err != nil {
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	updated, err := services.Right.Update(c, model, cast.ToUint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Error(err.Error(), http.StatusNotFound, c)
			return
		}
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	response.OK(updated,c)
}

//	@Summary	删除(delete)
//	@Tags		right
//	@Accept		application/json
//	@Produce	application/json
//	@Param		Authorization	header	string	true	"Bearer 用户令牌"
//	@Param		id				path	int		true	"id"
//	@Success	200
//	@Failure	400	"请求错误"
//	@Failure	401	"token验证失败"
//	@Failure	500	"内部错误"
//	@Router		/api/rights/{id} [delete]
func RightDel(c *gin.Context) {
	id := c.Param(`id`)
	if id == `` {
		response.Error(`pls input id`, http.StatusBadRequest,c)
		return
	}
	deleted, err := services.Right.Delete(c, cast.ToUint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Error(err.Error(), http.StatusNotFound, c)
			return
		}
		response.Error(err.Error(), http.StatusBadRequest,c)
		return
	}
	response.OK(deleted,c)
}
