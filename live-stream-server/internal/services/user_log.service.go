/*
generated by comer,https://github.com/imoowi/comer
Copyright © 2023 jun<simpleyuan@gmail.com>
*/
package services

import (
	"github.com/imoowi/comer/interfaces/impl"
	"github.com/imoowi/live-stream-server/internal/models"
	"github.com/imoowi/live-stream-server/internal/repos"
)

var UserLog *UserLogService

type UserLogService struct {
	impl.Service[*models.UserLog]
}

func NewUserLogService(r *repos.UserLogRepo) *UserLogService {
	return &UserLogService{
		Service: *impl.NewService[*models.UserLog](r),
	}
}

func init() {
	RegisterServices(func() {
		UserLog = NewUserLogService(repos.UserLog)
	})
}